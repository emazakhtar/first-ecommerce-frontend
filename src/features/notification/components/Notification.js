import React, { useContext, useEffect, useState } from "react";

import { Socket } from "socket.io-client";
import { SocketContext } from "../socketContext";

const Notifications = () => {
  // Access the socket instance from context
  const socket = useContext(SocketContext);
  // Local state to store notifications
  const [notifications, setNotifications] = useState([]);
  // State to toggle the visibility of the notifications list
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    // When the component mounts, request existing notifications
    socket.emit("getNotifications");

    // Listen for the server to send the list of saved notifications
    socket.on("loadNotifications", (data) => {
      console.log(data);
      setNotifications(data);
    });

    // Listen for new notifications emitted by the server
    socket.on("newNotification", (data) => {
      console.log("Received new notification:", data);
      // Add the new notification to the beginning of the notifications array
      setNotifications((prev) => [data, ...prev]);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("loadNotifications");
      socket.off("newNotification");
    };
  }, [socket]);

  // Function to toggle the notification list's visibility
  const toggleNotificationList = () => {
    setShowList(!showList);
  };

  // Function to mark a notification as read
  const markNotificationAsRead = (notificationId) => {
    // Emit the "markAsRead" event with the notification ID and provide a callback
    socket.emit("markAsRead", notificationId, (response) => {
      if (response.status === "success" && response.notification) {
        // Update the local state to reflect the read status
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId ? response.notification : n
          )
        );
        console.log("Notification marked as read");
      } else {
        console.error("Failed to mark notification as read:", response.error);
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Notification Icon and Panel */}
      <div className="relative ml-4">
        <button
          onClick={toggleNotificationList}
          className="relative text-2xl focus:outline-none text-gray-800"
        >
          🔔
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5">
              {notifications.length}
            </span>
          )}
        </button>
        {showList && (
          <div className="absolute right-0 md:left-1/2 md:transform md:-translate-x-1/2 mt-2 w-80 max-h-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">
                  Notifications
                </h3>
              </div>
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  No new notifications.
                </div>
              ) : (
                notifications.map((n, index) => (
                  <div
                    key={index}
                    className={`px-4 py-3 border-b last:border-none ${
                      n.read ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm text-gray-800">{n.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                    {!n.read && (
                      <button
                        className="mt-2 inline-block text-xs text-white bg-blue-600 hover:bg-blue-700 transition-colors px-3 py-1 rounded-md"
                        onClick={() => markNotificationAsRead(n.resourceId)}
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
