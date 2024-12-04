import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createReturnAsync,
  fetchOrderByIdAsync,
  selectOrderError,
  selectOrderStatus,
  selectSelectedOrder,
} from "../ordersSlice";
import { selectLoggedInUserInfo } from "../../users/usersSlice";
import { Grid } from "react-loader-spinner";
import { useAlert } from "react-alert";

const ReturnExchangeForm = () => {
  const error = useSelector(selectOrderError);
  console.log(error);
  // selected ORDER
  const order = useSelector(selectSelectedOrder);
  const userInfo = useSelector(selectLoggedInUserInfo);
  const userEmail = userInfo && userInfo.email;
  const status = useSelector(selectOrderStatus);

  console.log(order);
  // grabbing orderId from url params..
  const params = useParams();
  const orderId = params.orderId;
  const dispatch = useDispatch();
  const alert = useAlert();

  // fetching the order...
  useEffect(() => {
    dispatch(fetchOrderByIdAsync(orderId));
  }, [orderId, dispatch]);

  // State to track form values
  const [formData, setFormData] = useState({
    requestType: "return", // default value for dropdown
    selectedProducts: {}, // Object to store selected products as true/false
    reason: "", // Reason input
  });

  // Handler to update form data when dropdown  changes
  const handleDropdownChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      requestType: e.target.value,
    }));
  };

  // Handler to update product selection (checkboxes)
  const handleProductSelection = (productId) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: {
        ...prev.selectedProducts,
        [productId]: !prev.selectedProducts[productId], // Toggle selection
      },
    }));
  };

  // Handler to update reason input
  const handleReasonChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      reason: e.target.value,
    }));
  };

  // Submit handler to gather all form data
  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather all data to be sent to the backend API
    const submissionData = {
      userEmail: userEmail,
      orderId: orderId,
      requestType: formData.requestType,
      products: Object.keys(formData.selectedProducts).filter(
        (productId) => formData.selectedProducts[productId]
      ), // Only send selected products
      reason: formData.reason,
    };

    // Mock API call - here you would replace it with your actual API call
    console.log("Submitting return/exchange:", submissionData);
    console.log("submission data", submissionData);
    // calling the async api
    dispatch(createReturnAsync({ data: submissionData, alert }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-md shadow-lg max-w-md mx-auto mt-14"
    >
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

      <h2 className="text-xl font-semibold mb-4">Return/Exchange Form</h2>

      {/* Dropdown for selecting return/exchange */}
      <div className="mb-4">
        <label
          htmlFor="requestType"
          className="block text-sm font-medium text-gray-700"
        >
          Request Type:
        </label>
        <select
          id="requestType"
          value={formData.requestType}
          onChange={handleDropdownChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="return">Return</option>
          <option value="exchange">Exchange</option>
        </select>
      </div>

      {/* Checkboxes for each product */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Products:
        </label>
        {order &&
          order.cartItems &&
          order.cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center mb-4 p-4 border rounded-lg"
            >
              {/* Product Image */}
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.thumbnail}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col ml-4 w-full">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor={item.product.id}
                    className="text-md font-medium text-gray-800"
                  >
                    {item.product.title}
                  </label>

                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    id={item.product.id}
                    checked={!!formData.selectedProducts[item.product.id]}
                    onChange={() => handleProductSelection(item.product.id)}
                    className="ml-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>

                {/* Price and Quantity */}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    Price: ₹{item.product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Reason input */}
      <div className="mb-4">
        <label
          htmlFor="reason"
          className="block text-sm font-medium text-gray-700"
        >
          Reason for Return/Exchange:
        </label>
        <textarea
          id="reason"
          value={formData.reason}
          onChange={handleReasonChange}
          placeholder="Please explain your reason..."
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Submit button */}
      <div className="mb-4">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
        >
          Submit Request
        </button>
      </div>
      {error && <p className="text-red-500">{error.code}</p>}
      {error && <p className="text-red-500">{error.code}</p>}
    </form>
  );
};

export default ReturnExchangeForm;
