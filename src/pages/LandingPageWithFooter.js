import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import LandingPage from "./LandingPage";

function LandingPageWithFooter() {
  return (
    <div>
      <Navbar>
        <LandingPage></LandingPage>
      </Navbar>
      <Footer></Footer>
    </div>
  );
}

export default LandingPageWithFooter;
