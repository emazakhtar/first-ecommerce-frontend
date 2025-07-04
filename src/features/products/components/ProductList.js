import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByFilterAsync,
  selectAllProducts,
  selectTotalItems,
  selectBrand,
  selectCategory,
  selectProductListStatus,
} from "../productSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import Pagination from "../../common/Pagination";
import { Grid } from "react-loader-spinner";
import { addToCartAsync, selectCart } from "../../cart/cartSlice";
import { useAlert } from "react-alert";
import { selectLoggedInUserInfo } from "../../users/usersSlice";
import { selectLoggedInUserToken } from "../../auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  {
    name: "Price: Low to High",
    sort: "discountedPrice",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "discountedPrice",
    order: "desc",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const brand = useSelector(selectBrand);
  const category = useSelector(selectCategory);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const status = useSelector(selectProductListStatus);
  const cartItems = useSelector(selectCart);
  const alert = useAlert();
  const userLoggedIn = useSelector(selectLoggedInUserToken);
  const navigate = useNavigate();

  const filters = [
    {
      id: "brand",
      name: "Brand",
      options: brand,
    },
    {
      id: "category",
      name: "Category",
      options: category,
    },
    {
      id: "color",
      name: "Color",
      options: [],
    },
    {
      id: "size",
      name: "Size",
      options: [],
    },
  ];

  useEffect(() => {
    const pagination = {
      _page: page,
      _limit: ITEMS_PER_PAGE,
    };
    dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    // why here why not after click of brand or category
    setPage(1);
  }, [totalItems]);

  const handleFilter = (e, option, section) => {
    console.log(section.id, option.value, e.target.checked);
    // yahan pe state change mein re rendering kaise hota h usmey confusion h
    let newFilter = {
      ...filter,
    };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [];
        newFilter[section.id].push(option.value);
      }
    } else {
      let id = newFilter[section.id].findIndex((c) => {
        return option.value === c;
      });
      newFilter[section.id].splice(id, 1);
    }
    console.log(newFilter);
    setFilter(newFilter);
    // setPage(1);
  };

  const handleSort = (e, option) => {
    let newSort = { _sort: option.sort, _order: option.order };
    console.log(newSort);
    setSort(newSort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleCart = (id) => {
    // navigate to /login if user not logged in.......
    if (!userLoggedIn) {
      navigate("/login");
    }

    if (cartItems.findIndex((item) => item.product.id === id) < 0) {
      const newCartItem = {
        quantity: 1,
        product: id,
      };
      dispatch(addToCartAsync({ item: newCartItem, alert }));
      // it will be based on server response of backend
    } else {
      alert.error("item already added to cart");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
    >
      <div>
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilter={handleFilter}
          setPage={setPage}
          filters={filters}
        />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24"
          >
            <h1 className="text-3xl font-bold tracking-tight text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Discover Amazing Products
            </h1>

            <div className="flex items-center space-x-4">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <motion.p
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={(e) => handleSort(e, option)}
                              className={`${
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500"
                              } ${
                                active ? "bg-gray-50" : ""
                              } block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors duration-200`}
                            >
                              {option.name}
                            </motion.p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="p-2 text-gray-400 hover:text-gray-500 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="p-2 text-gray-400 hover:text-gray-500 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </motion.button>
            </div>
          </motion.div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter
                handleFilter={handleFilter}
                setPage={setPage}
                filters={filters}
              />
              <ProductGrid
                products={products}
                status={status}
                handleCart={handleCart}
              />
            </div>
          </section>
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
          />
        </main>
      </div>
    </motion.div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  setPage,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden z-50"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) =>
                                    handleFilter(e, option, section)
                                  }
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({ handleFilter, setPage, filters }) {
  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:block"
    >
      <h3 className="sr-only">Categories</h3>
      {filters.map((section, index) => (
        <Disclosure
          as="div"
          key={index}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-4 py-3 text-sm text-gray-400 hover:text-gray-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      key={optionIdx}
                      className="flex items-center"
                    >
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        onChange={(e) => handleFilter(e, option, section)}
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </motion.form>
  );
}

function ProductGrid({ products, status, handleCart }) {
  return (
    <div className="lg:col-span-3 sm:col-span-6 md:col-span-4">
      <div className="bg-transparent">
        <div className="mx-auto max-w-2xl px-0 py-0 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-0">
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {status === "loading" ? (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <Grid
                  className="loader"
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : null}
            <AnimatePresence>
              {products.map(
                (product, index) =>
                  !product.deleted && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Link to={`/product-detail/${product.id}`}>
                        <div
                          className={`relative border-solid border-2 border-gray-200 p-2 w-full rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
                            status === "loading" ? "blur" : ""
                          }`}
                        >
                          <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-90 transition-opacity duration-300">
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                              src={product.thumbnail}
                              alt={product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="mt-4 flex justify-between">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                                {product.title}
                              </h3>
                              <div className="mt-1 flex items-center">
                                <StarIcon className="w-5 h-5 text-yellow-400" />
                                <span className="ml-1 text-sm text-gray-600">
                                  {product.rating}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">
                                ₹{product.discountedPrice}
                              </p>
                              <p className="text-sm line-through text-gray-400">
                                ₹{product.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {product.stock <= 0 ? (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="flex justify-center mt-4"
                        >
                          <p className="w-4/5 bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600 transition duration-300 shadow-sm">
                            Out of Stock
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="flex justify-center mt-4"
                        >
                          <button
                            onClick={() => handleCart(product.id)}
                            className="w-4/5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:from-purple-700 hover:to-blue-600 transition duration-300 shadow-sm flex items-center justify-center space-x-2"
                          >
                            <ShoppingCartIcon className="w-5 h-5" />
                            <span>Add to Cart</span>
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
