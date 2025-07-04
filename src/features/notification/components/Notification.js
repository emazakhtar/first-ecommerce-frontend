import React, { useContext, useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import { SocketContext } from "../socketContext";
import { motion, AnimatePresence } from "framer-motion";

const Notifications = () => {
  const socket = useContext(SocketContext);
  const [notifications, setNotifications] = useState([]);
  const [showList, setShowList] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    socket.emit("getNotifications");

    socket.on("loadNotifications", (data) => {
      console.log(data);
      setNotifications(data);
    });

    socket.on("newNotification", (data) => {
      console.log("Received new notification:", data);
      setNotifications((prev) => [data, ...prev]);
    });

    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      socket.off("loadNotifications");
      socket.off("newNotification");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [socket]);

  const toggleNotificationList = () => {
    setShowList(!showList);
  };

  const markNotificationAsRead = (notificationId) => {
    socket.emit("markAsRead", notificationId, (response) => {
      if (response.status === "success" && response.notification) {
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId ? response.notification : n
          )
        );
      }
    });
  };

  const markAllAsRead = () => {
    socket.emit("markAllAsRead", (response) => {
      if (response.status === "success") {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      }
    });
  };

  const clearAllNotifications = () => {
    socket.emit("clearAllNotifications", (response) => {
      if (response.status === "success") {
        setNotifications([]);
      }
    });
  };

  return (
    <div className="relative inline-block" ref={notificationRef}>
      <button
        onClick={toggleNotificationList}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-200"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showList && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-[280px] sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999]"
            style={{
              position: "fixed",
              top: "60px",
              right: "10px",
              maxHeight: "calc(100vh - 80px)",
              overflow: "hidden",
            }}
          >
            <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Notifications
                </h3>
                <div className="flex space-x-2">
                  {notifications.length > 0 && (
                    <>
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Mark all as read
                      </button>
                      <button
                        onClick={clearAllNotifications}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Clear all
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div
              className="overflow-y-auto custom-scrollbar"
              style={{ maxHeight: "calc(100vh - 180px)" }}
            >
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">
                    No notifications yet
                  </p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 border-b last:border-none hover:bg-gray-50 transition-colors duration-150 ${
                      notification.read ? "bg-white" : "bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.read ? "bg-gray-300" : "bg-blue-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 break-words">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                        {!notification.read && (
                          <button
                            onClick={() =>
                              markNotificationAsRead(notification.resourceId)
                            }
                            className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
