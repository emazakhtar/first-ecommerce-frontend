import React from "react";
import ProductList from "../features/products/components/ProductList";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

function Home() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      <Footer></Footer>
    </div>
  );
}

export default Home;
