import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllReturnsAsync,
  selectAllReturns,
  selectOrderStatus,
  updateReturnByIdAsync,
} from "../../orders/ordersSlice";
import { Link } from "react-router-dom";
import { Grid } from "react-loader-spinner";

const AdminReturn = () => {
  const returns = useSelector(selectAllReturns);
  const dispatch = useDispatch();
  const status = useSelector(selectOrderStatus);

  useEffect(() => {
    dispatch(fetchAllReturnsAsync());
  }, [dispatch]);

  const handleActionChange = (e, returnItem) => {
    const selectedAction = e.target.value;
    console.log(returnItem);
    const updatedReturnItem = {
      ...returnItem,
      status: selectedAction,
    };
    console.log(updatedReturnItem);
    dispatch(
      updateReturnByIdAsync({
        id: returnItem.id,
        updatedReturnItem: updatedReturnItem,
      })
    );
  };

  return (
    <div className="container mx-auto p-4 mt-10">
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
      <h2 className="text-2xl font-bold mb-4">Manage Returns</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">User Email</th>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Request Type</th>
              <th className="py-2 px-4 border-b">Reason</th>
              <th className="py-2 px-4 border-b">Product Id</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Updated At</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns &&
              returns.map((returnItem) => (
                <tr key={returnItem.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{returnItem.userEmail}</td>
                  <Link to={`/admin/order-detail/${returnItem.orderId}`}>
                    <td className="py-2 px-4 border-b">{returnItem.orderId}</td>
                  </Link>
                  <td className="py-2 px-4 border-b">
                    {returnItem.requestType}
                  </td>
                  <td className="py-2 px-4 border-b">{returnItem.reason}</td>
                  <td className="py-2 px-4 border-b">
                    {returnItem &&
                      returnItem.products &&
                      returnItem.products.map((product, index) => (
                        <div key={index}>
                          <Link to={`/product-detail/${product}`}>
                            <p># {product}</p>
                          </Link>
                          {/* <p>Qty: {product.quantity}</p> */}
                        </div>
                      ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {returnItem.updatedAt &&
                      new Date(returnItem.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {returnItem.updatedAt &&
                      new Date(returnItem.updatedAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{returnItem.status}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      className="bg-gray-200 border rounded px-3 py-1"
                      onChange={(e) => handleActionChange(e, returnItem)}
                    >
                      <option value="">Select Action</option>
                      <option value="approve">Approved</option>
                      <option value="reject">Rejected</option>
                      <option value="request-more-info">
                        Request More Info
                      </option>
                      <option value="hold">Shipped</option>
                      <option value="hold">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReturn;
