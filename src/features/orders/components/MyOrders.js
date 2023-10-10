import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "react-loader-spinner";
import {
  fetchAllUsersOrdersAsync,
  selectUserOrders,
  selectUserStatus,
} from "../../users/usersSlice";

function MyOrders() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserStatus);

  useEffect(() => {
    dispatch(fetchAllUsersOrdersAsync());
  }, [dispatch]);

  return (
    <div className="container mt-10 mx-auto py-8">
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
      {status !== "loading" && orders.length === 0 && (
        <div className="text-center mt-6">
          <p className="text-gray-600 text-lg">
            Currently, you have no orders...
          </p>
          <Link to="/">
            <button
              type="button"
              className="mt-4 px-6 py-3 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              onClick={() => setOpen(false)}
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
      {orders.length > 0 && (
        <div
          className={`bg-white shadow-lg rounded-lg overflow-hidden ${
            status === "loading" ? "blur" : ""
          }`}
        >
          <h1 className="text-3xl font-semibold bg-indigo-500 text-white p-4">
            My Orders
          </h1>
          <ul className="divide-y divide-gray-300">
            {orders.map((order, index) => (
              <li key={index} className="p-4 ">
                <div className=" border border-gray-300 flex flex-col md:flex-row items-center">
                  <div className="flex-1">
                    {order.cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex space-x-4 py-2 md:py-0"
                      >
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <h3 className="text-lg font-semibold">
                            {item.product.title}
                          </h3>
                          <div>
                            <span className="text-gray-600">Qty:</span>{" "}
                            {item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-md text-gray-600 text-center md:text-left mt-4 md:mt-0">
                    <div className="mb-2">
                      <span className="text-gray-600">Order No:</span>{" "}
                      <span className="text-gray-700">#{order.id}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600">Status:</span>{" "}
                      <span className="text-gray-700">{order.status}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600">Payment Method:</span>{" "}
                      <span className="text-gray-700">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600">Payment Status:</span>{" "}
                      <span className="text-gray-700">
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600">Subtotal:</span>{" "}
                      <span className="text-gray-700">
                        ${order.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-gray-600">
                  <p className="font-semibold">Shipping Address:</p>
                  <p>{order.selectedAddress.name}</p>
                  <p>{order.selectedAddress.email}</p>
                  <p>{order.selectedAddress.street}</p>
                  <p>
                    {order.selectedAddress.city}, {order.selectedAddress.state}
                  </p>
                  <p>Phone: {order.selectedAddress.phone}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
