import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderStatus } from "../ordersSlice";
import { Grid } from "react-loader-spinner";
import {
  fetchAllUsersOrdersAsync,
  selectUserOrders,
} from "../../users/usersSlice";

function MyOrders() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  console.log(orders);
  const status = useSelector(selectOrderStatus);
  useEffect(() => {
    dispatch(fetchAllUsersOrdersAsync());
  }, [dispatch]);

  return (
    <>
      {status === "loading" && (
        <Grid
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {orders.length > 0 ? (
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              My Orders
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <div>
                    <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                      Order No #{order.id}
                    </h1>
                    <li key={index} className="flex py-6">
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex text-base font-medium text-gray-900">
                            {order.cartItems.map((item) => (
                              <>
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.product.thumbnail}
                                    alt={item.product.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <h3>
                                  <div>{item.product.title}...</div>
                                </h3>
                                <div>
                                  {" "}
                                  <label>Qty</label>
                                  <p>{item.quantity}</p>
                                </div>
                              </>
                            ))}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {order.color && order.color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex"></div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal </p>
                          <p>${order.totalAmount}</p>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Status</p>
                          <p>{order.status} </p>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Payment Method: </p>
                          <p>{order.paymentMethod} </p>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total Items</p>
                          <p>{order.totalItems} </p>
                        </div>
                      </div>
                    </li>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Shipping Address
                    </p>
                    <div className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200">
                      <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {order.selectedAddress.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectedAddress.email}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectedAddress.street}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {order.selectedAddress.city}
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {order.selectedAddress.state}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Phone: {order.selectedAddress.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
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
      ) : (
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
          No Orders yet
        </h1>
      )}
    </>
  );
}

export default MyOrders;
