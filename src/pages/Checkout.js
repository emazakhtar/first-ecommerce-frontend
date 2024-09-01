import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemsFromCartAsync,
  selectCart,
  selectCartStatus,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import {
  createOrderAsync,
  selectOrderSuccess,
  selectOrderStatus,
} from "../features/orders/ordersSlice";
import {
  selectLoggedInUserInfo,
  selectUserStatus,
  updateUserAsync,
} from "../features/users/usersSlice";
import { Link, Navigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";

function Checkout() {
  const [open, setOpen] = useState(true);
  const cartItems = useSelector(selectCart);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserInfo);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const orderSuccess = useSelector(selectOrderSuccess);
  const orderStatus = useSelector(selectOrderStatus);
  const cartStatus = useSelector(selectCartStatus);
  const userStatus = useSelector(selectUserStatus);

  const [addNewAddressFormOpen, setAddNewAddressFormOpen] = useState(false);
  const totalAmount = cartItems.reduce(
    (amount, item) => item.product.discountedPrice * item.quantity + amount,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const handleSelectedAddress = (e) => {
    setSelectedAddress(user.address[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrders = (e) => {
    dispatch(
      createOrderAsync({
        cartItems,
        totalItems,
        totalAmount,
        selectedAddress,
        paymentMethod,
        status: "pending",
      })
    );
  };

  return (
    <>
      {orderSuccess && orderSuccess.paymentMethod === "cash" && (
        <Navigate to={`/order-success/${orderSuccess.id}`} replace={true} />
      )}
      {orderSuccess && orderSuccess.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout`} replace={true} />
      )}
      {(orderStatus === "loading" ||
        cartStatus === "loading" ||
        userStatus === "loading") && (
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
      )}
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          orderStatus === "loading" ||
          cartStatus === "loading" ||
          userStatus === "loading"
            ? "blur"
            : ""
        }`}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {addNewAddressFormOpen && (
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    updateUserAsync({
                      ...user,
                      address: [...user.address, data],
                    })
                  );
                  reset();
                  setAddNewAddressFormOpen(false);
                })}
                className="bg-white px-5 py-12 mt-12"
              >
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Name is required",
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                              message: "Invalid email format",
                            },
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          type="tel"
                          id="phone"
                          {...register("phone", {
                            required: "Phone is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "Street is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "State is required",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Pin code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pincode", {
                            required: "Pincode is required",
                          })}
                          id="pincode"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={() => reset()}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </form>
            )}

            <div className="border-b border-gray-900/10 pb-12">
              {user && user.address.length > 0 && (
                <div>
                  <h2 className="py-2 text-base font-semibold leading-7 text-gray-900">
                    Your Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from existing addresses
                  </p>
                </div>
              )}

              <ul>
                {user &&
                  user.address.length === 0 &&
                  addNewAddressFormOpen === false && (
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>Please add an address to proceed.</p>
                    </div>
                  )}
                {user &&
                  user.address &&
                  user.address.map((address, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200"
                    >
                      <div className="flex gap-x-4">
                        <input
                          onChange={handleSelectedAddress}
                          value={index}
                          name="address"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />

                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.email}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.street}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {address.city}
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {address.state}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Phone: {address.phone}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
              {!addNewAddressFormOpen && (
                <div
                  onClick={() => setAddNewAddressFormOpen(true)}
                  className="mt-6 flex items-center justify-end gap-x-6"
                >
                  <button
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Add New Address
                  </button>
                </div>
              )}

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        onChange={handlePayment}
                        id="cash"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        name="payments"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        onChange={handlePayment}
                        value="card"
                        checked={paymentMethod === "card"}
                        id="card"
                        name="payments"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-0 lg:px-0">
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
                                <div>{item.product.title}</div>
                              </h3>
                              <p className="ml-4">
                                ${item.product.discountedPrice}
                              </p>
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
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) => handleRemoveFromCart(e, item)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
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
                  <p>${totalAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items</p>
                  <p>{totalItems} item</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrders}
                    className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700"
                  >
                    Pay And Order
                  </div>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
