import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectOrderStatus,
  selectTotalOrders,
  updateOrderByIdAsync,
} from "../../orders/ordersSlice";
import {
  EyeIcon,
  PencilIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { Link } from "react-router-dom";
import { Grid } from "react-loader-spinner";

function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const totalItems = useSelector(selectTotalOrders);
  const status = useSelector(selectOrderStatus);

  const [orderStatusFormOpen, setOrderStatusFormOpen] = useState(-1);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination, sort }));
  }, [dispatch, page, sort]);

  const handleEdit = (e, order) => {
    setOrderStatusFormOpen(order.id);
  };

  const handleOrderStatus = (e, order) => {
    dispatch(updateOrderByIdAsync({ ...order, status: e.target.value }));
    setOrderStatusFormOpen(-1);
  };

  const handlePaymentStatus = (e, order) => {
    dispatch(updateOrderByIdAsync({ ...order, paymentStatus: e.target.value }));
    setOrderStatusFormOpen(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-200 text-green-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "received":
        return "bg-purple-200 text-green-600";
      default:
        return "bg-purple-200 text-blue-600";
    }
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = {
      _sort: sortOption.sort,
      _order: sortOption.order,
    };
    setSort(sort);
  };

  return (
    <div className="overflow-x-auto">
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

      <div className="bg-gray-100 font-sans overflow-hidden">
        <div className="bg-white shadow-md rounded my-6">
          <div className="sm:w-full md:w-auto overflow-x-scroll">
            <table className="w-full sm:table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="cursor-pointer py-3 px-0 text-left"
                    onClick={() =>
                      handleSort({
                        sort: "id",
                        order: sort._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order No
                    {sort._sort === "id" && sort._order === "desc" ? (
                      <ArrowUpIcon className="w-5 h-5 inline"></ArrowUpIcon>
                    ) : (
                      <ArrowDownIcon className="w-5 h-5 inline"></ArrowDownIcon>
                    )}
                  </th>

                  <th className="py-3 px-0 text-left">Items</th>
                  <th
                    onClick={() =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort._order === "asc" ? "desc" : "asc",
                      })
                    }
                    className="cursor-pointer py-3 px-0 text-center"
                  >
                    Total Amount
                    {sort._sort === "totalAmount" && sort._order === "desc" ? (
                      <ArrowUpIcon className="w-5 h-5 inline"></ArrowUpIcon>
                    ) : (
                      <ArrowDownIcon className="w-5 h-5 inline"></ArrowDownIcon>
                    )}
                  </th>
                  <th className="py-3 px-0 text-center">Shipping Address</th>
                  <th className="py-3 px-0 text-center">Payment Method</th>
                  <th
                    onClick={() =>
                      handleSort({
                        sort: "createdAt",
                        order: sort._order === "asc" ? "desc" : "asc",
                      })
                    }
                    className="py-3 px-0 cursor-pointer text-center"
                  >
                    Order Time
                    {sort._sort === "createdAt" && sort._order === "desc" ? (
                      <ArrowUpIcon className="w-5 h-5 inline"></ArrowUpIcon>
                    ) : (
                      <ArrowDownIcon className="w-5 h-5 inline"></ArrowDownIcon>
                    )}
                  </th>
                  <th
                    onClick={() =>
                      handleSort({
                        sort: "updatedAt",
                        order: sort._order === "asc" ? "desc" : "asc",
                      })
                    }
                    className="py-3 px-0 cursor-pointer text-center"
                  >
                    Updated At
                    {sort._sort === "updatedAt" && sort._order === "desc" ? (
                      <ArrowUpIcon className="w-5 h-5 inline"></ArrowUpIcon>
                    ) : (
                      <ArrowDownIcon className="w-5 h-5 inline"></ArrowDownIcon>
                    )}
                  </th>
                  <th className="py-3 px-0 text-center">Status</th>
                  <th className="py-3 px-0 text-center">Payment Status</th>
                  <th className="py-3 px-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <Link to={`/admin/order-detail/${order.id}`}>
                      <td className="py-3 px-0 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">
                            {order.id.substring(0, 10)}{" "}
                            {/* Truncate order id */}
                          </span>
                        </div>
                      </td>
                    </Link>
                    <td className="py-3 px-0 text-left">
                      {order.cartItems.map((item) => (
                        <div className="flex items-center" key={item.id}>
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                              alt={item.title}
                            />
                          </div>
                          <span className="">
                            {item.product.title} - Qty-{item.quantity} - Price-$
                            {item.product.discountedPrice}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddress.name},</strong>
                        </div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city},</div>
                        <div>{order.selectedAddress.state},</div>
                        <div>{order.selectedAddress.pincode},</div>
                        <div>{order.selectedAddress.phone},</div>
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.paymentMethod}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.createdAt &&
                          new Date(order.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.updatedAt &&
                          new Date(order.updatedAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 px-0 text-center">
                      {order.id === orderStatusFormOpen ? (
                        <select onChange={(e) => handleOrderStatus(e, order)}>
                          <option value="status">Status</option>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-0 text-center">
                      {order.id === orderStatusFormOpen ? (
                        <select onChange={(e) => handlePaymentStatus(e, order)}>
                          <option value="status">Status</option>
                          <option value="pending">Pending</option>
                          <option value="received">Received</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.paymentStatus
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.paymentStatus}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex item-center justify-center">
                        <div className=" mr-6 w-4 transform hover:text-purple-500 hover:scale-110">
                          <EyeIcon className="cursor-pointer h-7 w-7"></EyeIcon>
                        </div>

                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <PencilIcon
                            onClick={(e) => handleEdit(e, order)}
                            className="cursor-pointer h-7 w-7"
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalItems}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
