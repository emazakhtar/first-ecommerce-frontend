import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderByIdAsync, selectSelectedOrder } from "../ordersSlice";

function Return () {
    let {orderId} = useParams();
    const dispatch = useDispatch();
    const selectedOrder = useSelector(selectSelectedOrder);

    useEffect(()=>{
        dispatch(fetchOrderByIdAsync(orderId));
    },[dispatch])

    return (
        <div>
        <h1>Return Page:</h1>
        </div>
    )
}
export default Return