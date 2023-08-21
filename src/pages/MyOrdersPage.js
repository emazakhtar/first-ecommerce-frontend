import React from "react";
import MyOrders from "../features/orders/components/MyOrders";
import Navbar from "../features/navbar/Navbar";

function MyOrdersPage() {
  return (
    <div>
      <Navbar>
        <MyOrders></MyOrders>
      </Navbar>
    </div>
  );
}

export default MyOrdersPage;
