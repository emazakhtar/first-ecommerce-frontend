import React from "react";
import Navbar from "../features/navbar/Navbar";
import OrderDetails from "../features/orders/components/OrderDetails";

function OrderDetailsPage() {
  return (
    <div>
      <Navbar>
        <OrderDetails></OrderDetails>
      </Navbar>
    </div>
  );
}

export default OrderDetailsPage;
