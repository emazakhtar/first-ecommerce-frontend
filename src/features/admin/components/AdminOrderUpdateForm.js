import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  fetchOrderByIdAsync,
  selectSelectedOrder,
  updateOrderByIdAsync,
} from "../../orders/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AdminOrderUpdateForm() {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const selectedOrder = useSelector(selectSelectedOrder);

  const params = useParams();

  useEffect(() => {
    dispatch(fetchOrderByIdAsync(params.id));
  }, [dispatch, params]);
  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
          let updatedOrder = { ...selectedOrder, status: data.status };
          console.log(updatedOrder);
          dispatch(updateOrderByIdAsync(updatedOrder));
          reset();
        })}
        className="bg-white px-5 py-12 mt-12"
      >
        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
          Update Order Status
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Enter shipping status below
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Status
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("status", {
                  required: "status is required",
                })}
                id="status"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button type="submit">Update</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminOrderUpdateForm;
