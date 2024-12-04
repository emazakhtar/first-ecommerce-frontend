import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchOrderByIdAsync,
  selectOrderStatus,
  selectSelectedOrder,
} from "../ordersSlice";
import { Grid } from "react-loader-spinner";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  console.log(orderId);
  const dispatch = useDispatch();
  const order = useSelector(selectSelectedOrder);
  const status = useSelector(selectOrderStatus);

  useEffect(() => {
    dispatch(fetchOrderByIdAsync(orderId));
  }, [dispatch, orderId]);

  const handleRateAndReview = (productId) => {
    navigate(`/rate-review/${productId}`);
  };

  return (
    <div className="container mx-auto p-4">
      {status === "loading" ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          {/* Loader component */}
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
      {/* Order Info Section */}

      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-4 mt-10">
        <h1 className="text-xl md:text-2xl font-semibold mb-2">
          Order Details
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Order ID: {order && order.id}
        </p>
        <p className="text-gray-600 text-sm md:text-base">
          Order Date: {order && new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Items Section */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Items Ordered</h2>
        {order &&
          order.cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-4 mb-4"
            >
              <Link to={`/product-detail/${item.product.id}`}>
                <div className="flex items-start md:items-center mb-4 md:mb-0">
                  <img
                    src={item.product.thumbnail}
                    alt={item.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-base md:text-lg font-semibold">
                      {item.product.title}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex flex-col md:flex-row items-start md:items-center">
                <p className="text-lg font-semibold mr-0 md:mr-4">
                  ${item.product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleRateAndReview(item.product.id)}
                  className="mt-2 md:mt-0 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                >
                  Rate & Review
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Total Section */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-lg md:text-xl font-semibold">Total Amount</h2>
        <p className="text-lg md:text-xl font-semibold">
          ${order && order.totalAmount.toFixed(2)}
        </p>
      </div>
      <div className="border border-gray-300 p-6 mb-12 bg-white mt-4 text-gray-600">
        <p className="font-semibold">Shipping Address:</p>
        <p>{order && order.selectedAddress.name}</p>
        <p>{order && order.selectedAddress.email}</p>
        <p>{order && order.selectedAddress.street}</p>
        <p>
          {order && order.selectedAddress.city},{" "}
          {order && order.selectedAddress.state}
        </p>
        <p>Phone: {order && order.selectedAddress.phone}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
