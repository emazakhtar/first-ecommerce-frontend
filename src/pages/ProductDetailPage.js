import React from "react";
import ProductDetail from "../features/products/components/ProductDetail";
import Navbar from "../features/navbar/Navbar";

function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <ProductDetail></ProductDetail>
      </Navbar>
    </div>
  );
}

export default ProductDetailPage;
