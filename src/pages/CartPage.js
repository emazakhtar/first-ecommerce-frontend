import React from "react";
import Cart from "../features/cart/components/Cart";
import Navbar from "../features/navbar/Navbar";

function CartPage() {
  return (
    <div>
      <Navbar>
        <Cart></Cart>
      </Navbar>
    </div>
  );
}

export default CartPage;
