import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../cart/cartSlice";
import { selectLoggedInUserInfo } from "../users/usersSlice";
import { selectLoggedInUserToken } from "../auth/authSlice";
const navigation = [
  // { name: "Products", link: "/", user: true },
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

  // login logout logic for navbar

  let loginLogout = "Login";
  let link = "login";

  if (user) {
    loginLogout = "Logout";
    link = "/logout";
  } else {
    loginLogout = "Login";
    link = "/login";
  }

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
      {
        <div className="min-h-full">
          <Disclosure
            as="nav"
            className={`bg-gray-100 fixed top-0 w-full z-50 shadow-md" 
            }`}
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <h1
                            className="hover:text-gray bg-white text-xl sm:text-xl md:text-xl lg:text-xl font-bold font-sans text-black
                           text-center text-gray-500 ml-4 md:mr-16 lg:mr-64 xl:mr-64"
                          >
                            <span class="bg-gray-100 italic">Ecommerce</span>
                          </h1>
                        </Link>
                      </div>
                      <nav className="container mx-auto flex justify-between items-center p-4 ">
                        {/* Logo */}
                        {/* <div className="text-xl font-bold text-black mr-64">
                          <Link to="/">MyShop</Link>
                        </div> */}

                        {/* Links */}
                        <div
                          className={`${
                            menuOpen ? "block" : "hidden"
                          } w-full md:flex md:items-center md:w-auto`}
                        >
                          <ul className="md:flex md:space-x-6 text-gray-700">
                            <li className="py-2 md:py-0">
                              <Link
                                to={"/all-products"}
                                className="hover:text-blue-500 transition duration-300"
                              >
                                <span class="text-gray-800">Products</span>
                              </Link>
                            </li>
                            <li className="py-2 md:py-0">
                              <Link
                                to={"/men"}
                                className="hover:text-blue-500 transition duration-300"
                              >
                                <span class="text-gray-800">Men</span>
                              </Link>
                            </li>
                            <li className="py-2 md:py-0">
                              <Link
                                to={"/women"}
                                className="hover:text-blue-500 transition duration-300"
                              >
                                <span class="text-gray-800">Women</span>
                              </Link>
                            </li>
                            <li className="py-2 md:py-0">
                              <Link
                                to={"/kids"}
                                className="hover:text-blue-500 transition duration-300"
                              >
                                <span class="text-gray-800">Kids</span>
                              </Link>
                            </li>
                            {loggedInUserToken ? (
                              <li className="py-2 md:py-0">
                                <Link
                                  to={"/logout"}
                                  className="hover:text-blue-500 transition duration-300"
                                >
                                  <span class="text-gray-800">Logout</span>
                                </Link>
                              </li>
                            ) : (
                              <li className="py-2 md:py-0">
                                <Link
                                  to={"/login"}
                                  className="hover:text-blue-500 transition duration-300"
                                >
                                  <span class="text-gray-800">Login</span>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      </nav>

                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {userInfo &&
                            navigation.map(
                              (item) =>
                                item[userInfo.role] && (
                                  <Link
                                    key={item.name}
                                    to={item.link}
                                    className={classNames(
                                      item.current
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                      "rounded-md px-3 py-2 text-sm font-medium"
                                    )}
                                    aria-current={
                                      item.current ? "page" : undefined
                                    }
                                  >
                                    {item.name}
                                  </Link>
                                )
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <Link to="/my-cart">
                          <button
                            cursor-pointer="true"
                            type="button"
                            className="relative rounded-full bg-white p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-750"
                          >
                            <span className="absolute -inset-1.5" />
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {cartItems.length > 0 && (
                          <span className="inline-flex items-center rounded-md mb-7 -ml-2 bg-red-50 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-500/10">
                            {cartItems.length}
                          </span>
                        )}
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w -xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://freesvg.org/img/abstract-user-flat-4.png"
                                alt="user-profile"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>

                    <div className="flex items-center justify-end flex-1 ml-auto -mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Link className="mt-2 mr-2" to="/notifications">
                        <button
                          type="button"
                          className="relative ml-auto flex-shrink-0 rounded-full bg-gray-100 p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-750"
                        >
                          {/* Notification Badge if needed */}
                          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" />

                          {/* Bell Icon */}
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </Link>
                      <Link className="mt-2" to="/my-cart">
                        <button
                          type="button"
                          className="relative ml-auto flex-shrink-0 rounded-full bg-gray-100 p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-750"
                        >
                          <span className="absolute -inset-1.5" />

                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {cartItems.length > 0 && (
                        <span className="inline-flex items-center rounded-md mb-7 -ml-2 bg-red-50 px-2 py-1 text-xs font-medium text-red-750 ring-1 ring-inset ring-red-500/10">
                          {cartItems.length}
                        </span>
                      )}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-100 p-2 text-gray-400 hover:bg-gray hover:text-black focus:outline-none focus:ring-2 focus:ring-white  focus:ring-offset-red-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>

                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {userInfo &&
                      navigation.map(
                        (item) =>
                          item[userInfo.role] && (
                            <Link key={item.name} to={item.link}>
                              <Disclosure.Button
                                as="a"
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Disclosure.Button>
                            </Link>
                          )
                      )}
                  </div>
                  <div className="border border-gray-300 pb-3 pt-4 -mt-5">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        {/* <img
                          className="h-10 w-10 rounded-full"
                          src={userInfo && userInfo.imageUrl}
                          alt="user-img"
                        /> */}
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {userInfo && userInfo.name}
                        </div>
                        {/* <div className="text-sm font-medium leading-none text-gray-400">
                          {userInfo && userInfo.email}
                        </div> */}
                      </div>
                    </div>
                    <div className=" space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.link}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* <header className="bg-white shadow mt-20">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                E-Commerce
              </h1>
            </div>
          </header> */}
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      }
    </>
  );
}

export default Navbar;
