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

// Import FontAwesome icons here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {} from "../../auth/authSlice";

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
    <>
      {status === "loading" && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Loader component */}
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
        className={`mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 ${
          status === "loading" ? "blur" : ""
        }`}
      >
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <div>{item.title}</div>
                        </h3>
                        <p className="ml-4">₹{item.product.discountedPrice}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.color && item.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select
                          onChange={(e) => handleQuantity(e, item)}
                          value={item.quantity}
                        >
                          {[1, 2, 3].map((quantity) => (
                            <option key={quantity} value={quantity}>
                              {quantity}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          onClick={(e) => handleRemoveFromCart(e, item)}
                          type="button"
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          <FontAwesomeIcon icon={faTrash} /> {/* Bin icon */}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>₹{totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p>{totalItems} item</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-gray-600 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
