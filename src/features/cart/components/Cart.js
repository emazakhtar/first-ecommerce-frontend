import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemsFromCartAsync,
  selectCart,
  selectCartStatus,
  updateCartAsync,
} from "../cartSlice";
import { Grid } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faShoppingBag,
  faArrowRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const [open, setOpen] = useState(true);
  const cartItems = useSelector(selectCart);
  const dispatch = useDispatch();
  const status = useSelector(selectCartStatus);

  const handleQuantity = (e, item) => {
    dispatch(
      updateCartAsync({
        id: item.id,
        quantity: +e.target.value,
      })
    );
  };

  const handleRemoveFromCart = (e, product) => {
    dispatch(removeItemsFromCartAsync(product));
  };

  const totalAmount = cartItems.reduce(
    (amount, item) => item.product.discountedPrice * item.quantity + amount,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {status === "loading" && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <Grid
            className="loader"
            height={80}
            width={80}
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            visible={true}
          />
        </div>
      )}
      <div
        className={`mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 rounded-2xl shadow-2xl ${
          status === "loading" ? "blur" : ""
        }`}
      >
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl my-5 font-bold tracking-tight text-gray-900 flex items-center gap-3"
          >
            <FontAwesomeIcon icon={faShoppingBag} className="text-indigo-600" />
            Your Shopping Cart
          </motion.h1>
          <div className="flow-root">
            <AnimatePresence>
              <ul className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex py-6 hover:bg-gray-50 transition-colors duration-200 rounded-lg p-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-md"
                    >
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </motion.div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="text-lg font-semibold hover:text-indigo-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="ml-4 text-lg font-bold text-indigo-600">
                            ₹{item.product.discountedPrice}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.color && (
                            <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                              {item.color}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <label className="text-sm font-medium text-gray-900 order-1 sm:order-none">
                            Quantity
                          </label>
                          <div className="flex items-center border rounded-lg order-2 sm:order-none">
                            <button
                              onClick={() =>
                                handleQuantity(
                                  {
                                    target: {
                                      value: Math.max(1, item.quantity - 1),
                                    },
                                  },
                                  item
                                )
                              }
                              className="px-3 py-1 hover:bg-gray-100 rounded-l-lg"
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button
                              onClick={() =>
                                handleQuantity(
                                  { target: { value: item.quantity + 1 } },
                                  item
                                )
                              }
                              className="px-3 py-1 hover:bg-gray-100 rounded-r-lg"
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => handleRemoveFromCart(e, item)}
                          className="font-medium text-red-600 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50 rounded-b-2xl"
        >
          <div className="space-y-4">
            <div className="flex justify-between text-lg font-medium text-gray-900">
              <p>Subtotal</p>
              <p className="text-indigo-600 font-bold">₹{totalAmount}</p>
            </div>
            <div className="flex justify-between text-lg font-medium text-gray-900">
              <p>Total Items</p>
              <p className="text-indigo-600 font-bold">{totalItems} items</p>
            </div>
            <p className="text-sm text-gray-500 italic">
              Shipping and taxes calculated at checkout.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6"
            >
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Proceed to Checkout
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </motion.div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p className="flex items-center gap-2">
                or
                <Link to="/">
                  <motion.button
                    whileHover={{ x: 5 }}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </motion.button>
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Cart;
