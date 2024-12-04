// AdminOrdersDetail.js

import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // for capturing the order ID
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrderByIdAsync,
  selectSelectedOrder,
  updateOrderByIdAsync,
} from "../../orders/ordersSlice"; // Assuming you have an orders slice in Redux
// Import reusable button component if you have it

const AdminOrdersDetail = () => {
  const { orderId } = useParams(); // Get order ID from URL
  const dispatch = useDispatch();
  const order = useSelector(selectSelectedOrder);

  // Fetch the specific order from Redux state
  // const order = useSelector((state) =>
  //   state.orders.find((order) => order.id === orderId)
  // );

  useEffect(() => {
    dispatch(fetchOrderByIdAsync(orderId));
  }, [dispatch, orderId]);

  if (!order) return <div>Order not found</div>;

  // Handler to update order status
  const handleStatusUpdate = (newStatus) => {
    dispatch(updateOrderByIdAsync({ id: orderId, status: newStatus }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col mt-10">
      {/* Header Section */}
      <header className="mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">Order Details</h1>
        <p className="text-gray-500">Order ID: {orderId}</p>
      </header>

      {/* Order Details Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg mb-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Customer Details
        </h2>
        <div className="text-gray-600">
          <p>
            <strong>Name:</strong> {order.selectedAddress.name}
          </p>
          <p>
            <strong>Email:</strong> {order.selectedAddress.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.selectedAddress.phone}
          </p>
          <p>
            <strong>Street:</strong> {order.selectedAddress.street}
          </p>
          <p>
            <strong>City:</strong> {order.selectedAddress.city}
          </p>
          <p>
            <strong>State:</strong> {order.selectedAddress.state}
          </p>
          <p>
            <strong>Pincode:</strong> {order.selectedAddress.pincode}
          </p>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg mb-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Product Details
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-gray-100">
                <th className="text-left p-4 text-gray-600">Product</th>
                <th className="text-left p-4 text-gray-600">Quantity</th>
                <th className="text-left p-4 text-gray-600">Price</th>
                <th className="text-left p-4 text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4">{item.product.title}</td>
                  <td className="p-4">#{item.quantity}</td>
                  <td className="p-4">₹ {item.product.price}</td>
                  <td className="p-4">
                    ₹ {item.product.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Order Status Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Order Status
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>Current Status:</strong> {order.status}
        </p>
        <div className="flex gap-4 mt-4">
          <button onClick={() => handleStatusUpdate("Processing")}>
            Processing
          </button>
          <button onClick={() => handleStatusUpdate("Shipped")}>Shipped</button>
          <button onClick={() => handleStatusUpdate("Delivered")}>
            Delivered
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminOrdersDetail;
