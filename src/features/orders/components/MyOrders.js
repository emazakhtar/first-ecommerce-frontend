import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "react-loader-spinner";
import { selectUserOrders, selectUserStatus } from "../../users/usersSlice";
import { selectOrderStatus } from "../ordersSlice";

function MyOrders() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserStatus);

  const isReturnable = (order) => {
    console.log(order);
    if (order.status === "delivered") {
      var deliveredDate = order.updatedAt;
      console.log(deliveredDate);
      const returnPeriod = 7; // days
      const orderDateObj = new Date(deliveredDate);
      const currentDate = new Date();
      const differenceInDays = Math.floor(
        (currentDate - orderDateObj) / (1000 * 60 * 60 * 24)
      );

      const daysLeft = returnPeriod - differenceInDays; // Calculate remaining days
      return daysLeft > 0 ? daysLeft : 0; // Return days left or 0 if past the period

      // return differenceInDays <= returnPeriod;
    } else {
      return 1;
    }
  };

  // useEffect(() => {
  //   dispatch(fetchAllUsersOrdersAsync());
  // }, [dispatch]);

  return (
    <div className="container mt-2 mx-auto py-8">
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
      {status !== "idle" && orders && orders.length === 0 && (
        <div className="text-center mt-6">
          <p className="text-gray-600 text-lg">
            Currently, you have no orders...
          </p>
          <Link to="/">
            <button
              type="button"
              className="mt-4 px-6 py-3 bg-red-500 text-white rounded hover:bg-indigo-600"
              onClick={() => setOpen(false)}
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
      {orders && orders.length > 0 && (
        <div
          className={`bg-white mt-2 shadow-lg rounded-lg overflow-hidden ${
            status === "loading" ? "blur" : ""
          }`}
        >
          <h1 className="text-3xl font-semibold bg-gray-800 text-white p-4">
            My Orders
          </h1>
          <ul className="divide-y divide-gray-300">
            {orders &&
              orders.map((order, index) => (
                <Link to={`/order-detail/${order.id}`}>
                  <li key={index} className="p-4">
                    <div className="border border-gray-300 flex flex-col md:flex-row items-center p-5">
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
                          <span className="text-gray-600">Order Date:</span>{" "}
                          <span className="text-gray-700">
                            {order.updatedAt &&
                              new Date(order.createdAt).toLocaleString()}
                          </span>
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
                            ₹{order.totalAmount}
                          </span>
                        </div>
                        {order.status === "delivered" ? (
                          isReturnable(order) > 0 ? (
                            // Condition for 'Return/Exchange' or 'Return ends in X days'
                            <>
                              <Link to={`/exchange/${order.id}`}>
                                <button className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                  Return/Exchange
                                </button>
                              </Link>
                              <div className="mt-4 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-center shadow-md sm:text-sm md:text-base lg:text-lg">
                                <p className="cursor-default text-gray-700 font-medium">
                                  Return Period Ends in{" "}
                                  <span className="text-indigo-600 font-semibold">
                                    {isReturnable(order)} days
                                  </span>
                                  .
                                </p>
                              </div>
                            </>
                          ) : (
                            // Condition for 'The return period has expired'
                            <div className="mt-4 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-center shadow-md sm:text-sm md:text-base lg:text-lg">
                              <p className="text-red-500 font-medium">
                                The return period has expired.
                              </p>
                            </div>
                          )
                        ) : null}
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
