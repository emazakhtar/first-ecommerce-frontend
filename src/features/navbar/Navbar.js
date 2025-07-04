import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../cart/cartSlice";
import { selectLoggedInUserInfo } from "../users/usersSlice";
import { selectLoggedInUserToken } from "../auth/authSlice";
import { SocketContext } from "../notification/socketContext";
import Notifications from "../notification/components/Notification";

const navigation = [
  { name: "Admin Products", link: "/admin/home", admin: true },
  { name: "Admin Orders", link: "/admin/orders", admin: true },
  { name: "Admin Returns", link: "/admin-returns", admin: true },
  { name: "Admin Reviews", link: "/admin/reviews", admin: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ children }) {
  const cartItems = useSelector(selectCart);
  const userInfo = useSelector(selectLoggedInUserInfo);
  const user = useSelector(selectLoggedInUserToken);
  const loggedInUserToken = useSelector(selectLoggedInUserToken);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [notifications, setNotifications] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    socket.emit("getNotifications");
    socket.on("loadNotifications", (data) => {
      setNotifications(data);
    });
    socket.on("newNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });
    return () => {
      socket.off("loadNotifications");
      socket.off("newNotification");
    };
  }, [socket]);

  const toggleNotificationList = () => {
    setShowList(!showList);
  };

  const markNotificationAsRead = (notificationId) => {
    socket.emit("markAsRead", notificationId, (response) => {
      if (response.status === "success") {
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId ? response.notification : n
          )
        );
      }
    });
  };

  let loginLogout = user ? "Logout" : "Login";
  let link = user ? "/logout" : "/login";

  const userNavigation = [
    { name: "My Profile", link: "/profile" },
    { name: "My Orders", link: "/my-orders" },
    { name: "My Returns", link: "/user-returns" },
    { name: "All Products", link: "/all-products" },
    { name: "Men", link: "/men" },
    { name: "Women", link: "/women" },
    { name: "Kids", link: "/kids" },
    { name: loginLogout, link: link },
  ];

  return (
    <>
      <div className="min-h-full">
        <Disclosure
          as="nav"
          className="bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-lg border-b border-gray-200/50"
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="flex h-16 sm:h-20 items-center justify-between">
                  <div className="flex-shrink-0">
                    <Link to="/" className="group">
                      <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-600 group-hover:to-blue-600">
                        Ecommerce
                      </h1>
                    </Link>
                  </div>

                  <div className="hidden md:flex md:items-center md:space-x-8">
                    <nav className="flex space-x-8">
                      <Link
                        to="/all-products"
                        className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                      >
                        Products
                      </Link>
                      <Link
                        to="/men"
                        className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                      >
                        Men
                      </Link>
                      <Link
                        to="/women"
                        className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                      >
                        Women
                      </Link>
                      <Link
                        to="/kids"
                        className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                      >
                        Kids
                      </Link>
                    </nav>

                    {userInfo && (
                      <div className="flex items-center space-x-4">
                        {navigation.map(
                          (item) =>
                            item[userInfo.role] && (
                              <Link
                                key={item.name}
                                to={item.link}
                                className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                              >
                                {item.name}
                              </Link>
                            )
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
                    <div className="scale-75 sm:scale-100">
                      <Notifications />
                    </div>

                    <Link to="/my-cart" className="relative group">
                      <button className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-all duration-300">
                        <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
                        {cartItems.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center transform scale-100 group-hover:scale-110 transition-transform duration-300 text-[10px] sm:text-xs">
                            {cartItems.length}
                          </span>
                        )}
                      </button>
                    </Link>

                    <Menu as="div" className="relative">
                      <Menu.Button className="flex items-center space-x-2 p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-all duration-300">
                        <img
                          className="h-6 w-6 sm:h-8 sm:w-8 rounded-full ring-2 ring-gray-200"
                          src="https://freesvg.org/img/abstract-user-flat-4.png"
                          alt="user-profile"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 sm:w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.link}
                                  className={`${
                                    active
                                      ? "bg-gray-50 text-blue-600"
                                      : "text-gray-700"
                                  } block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300`}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <div className="flex md:hidden">
                      <Disclosure.Button className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-5 w-5 sm:h-6 sm:w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-5 w-5 sm:h-6 sm:w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md">
                  <Link
                    to="/all-products"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-300"
                  >
                    Products
                  </Link>
                  <Link
                    to="/men"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-300"
                  >
                    Men
                  </Link>
                  <Link
                    to="/women"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-300"
                  >
                    Women
                  </Link>
                  <Link
                    to="/kids"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-300"
                  >
                    Kids
                  </Link>
                  {userInfo &&
                    navigation.map(
                      (item) =>
                        item[userInfo.role] && (
                          <Link
                            key={item.name}
                            to={item.link}
                            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-300"
                          >
                            {item.name}
                          </Link>
                        )
                    )}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl py-0 sm:px-6 lg:px-8 mt-16 sm:mt-20">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default Navbar;
