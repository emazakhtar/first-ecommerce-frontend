import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUserToken } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const loggedInUserToken = useSelector(selectLoggedInUserToken);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Big Header with Slideshow */}
      <header
        className="bg-slate-100 mt-16 w-full h-[60vh] flex flex-col justify-end relative bg-cover bg-center bg-contain"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?w=1060&t=st=1725386658~exp=1725387258~hmac=b2874a64a1fb6ebf3a324c8d6cc562032e5aa4240c9a35c0d26163be3661c3b6)",
        }}
      ></header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-4">
        {/* Image of a model */}

        <div className="w-full flex justify-center py-8">
          <img
            src="https://www.shutterstock.com/image-vector/50-percent-price-off-icon-260nw-1929725999.jpg"
            alt="Model"
            className="h-auto max-w-full"
          />
        </div>

        {/* Information Section */}
        <div className="bg-wheatsmoke w-full p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Our Store
          </h2>
          <p className="text-gray-600">
            Discover the best products and enjoy your shopping experience with
            us. Our store offers a wide range of products for men, women, and
            kids.
          </p>
        </div>

        {/* Small Div */}
        <div className="w-full py-4 flex justify-center">
          <div className="bg-gray-100 p-4 w-1/2 text-center">
            <p className="text-gray-600">Check out our latest arrivals!</p>
          </div>
        </div>

        {/* Product Section */}
        <div className="w-full py-8 flex justify-center">
          <div className="flex justify-between space-x-4 max-w-7xl mx-auto">
            <div className="bg-gray-100 shadow-lg p-4 w-1/3 flex flex-col items-center">
              <Link to={"/product-detail/66b3343be5c4892830b83eba"}>
                <img
                  src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
                  alt="Product 1"
                  className="h-auto max-w-full mb-4 bg-gray-100"
                />
                <Link
                  to={"/product-detail/66b3343be5c4892830b83eba"}
                  className="text-gray-600"
                >
                  Essence Mascara
                </Link>
              </Link>
            </div>

            <div className="bg-gray-100 shadow-lg p-4 w-1/3 flex flex-col items-center">
              <Link to={"/product-detail/66b3343be5c4892830b83eba"}>
                <img
                  src="https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png"
                  alt="Product 2"
                  className="h-auto max-w-full mb-4 bg-gray-100"
                />
                <Link
                  to={"/product-detail/66b3343be5c4892830b83ebb"}
                  className="text-gray-600"
                >
                  Eyeshadow Palette
                </Link>
              </Link>
            </div>

            <div className="bg-gray-100 shadow-lg p-4 w-1/3 flex flex-col items-center">
              <Link to={"/product-detail/66b3343be5c4892830b83eba"}>
                <img
                  src="https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png"
                  alt="Product 3"
                  className="bg-gray-100 h-auto max-w-full mb-4"
                />
                <Link
                  to={"/product-detail/66b3343be5c4892830b83ebc"}
                  className="text-gray-600"
                >
                  Powder Canister
                </Link>
              </Link>
            </div>
          </div>
        </div>
      </main>
      {/* Small Div */}
      <div className="w-full py-4 flex justify-center">
        <div className="bg-gray-100 p-4 w-1/2 text-center">
          <p className="text-gray-600">Check out our latest arrivals!</p>
        </div>
      </div>

      {/* Product 1 */}
      <div className="w-full py-8 flex justify-center">
        <div className="bg-gray-100 shadow-lg p-4 w-1/2 flex flex-col items-center w-3/4 h-64 overflow-hidden">
          <Link
            to={"/product-detail/66b3343be5c4892830b83ebd"}
            className="h-auto max-w-full mb-4 bg-gray-100 w-full h-full object-contain"
          >
            <img
              src="https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png"
              alt="product-1"
              className="h-auto max-w-full mb-4 bg-gray-100 w-full h-full object-contain"
            />
          </Link>
          {/* <Link
            to={"/product-detail/66b3343be5c4892830b83ebd"}
            io09ui7
            className="text-gray-600"
          >
            Red Lipstick
          </Link> */}
        </div>
      </div>
      {/* Product 2 */}
      <div className="w-full py-8 flex justify-center">
        <div className="bg-gray-100 shadow-lg p-4 w-1/2 flex flex-col items-center w-3/4 h-64 overflow-hidden">
          <Link
            to={"/product-detail/66b3343be5c4892830b83ebe"}
            className="h-auto max-w-full mb-4 bg-gray-100 w-full h-full object-contain"
          >
            <img
              src="https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png"
              alt="Product 2"
              className="h-auto max-w-full mb-4 bg-gray-100 w-full h-full object-contain"
            />
          </Link>
          {/* <Link
            to={"/product-detail/66b3343be5c4892830b83ebe"}
            className="text-gray-600"
          >
            Red Nail Polish
          </Link> */}
        </div>
      </div>

      {/* Product 3 */}
      <div className="w-full py-8 flex justify-center">
        <div className="bg-gray-100 shadow-lg p-4 w-1/2 flex flex-col items-center w-3/4 h-64 overflow-hidden">
          <Link
            to={"/product-detail/66b3343be5c4892830b83ebf"}
            className="h-auto max-w-full mb-4 bg-gray-100 w-full h-full object-contain"
          >
            <img
              src="https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png"
              alt="Product 3"
              className="h-auto max-w-full mb-4 bg-gray-100 w-full h-full object-contain"
            />
          </Link>
          {/* <Link
            to={"/product-detail/66b3343be5c4892830b83ebf"}
            className="text-gray-600"
          >
            Calvin Klein CK One
          </Link> */}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white w-full py-4 shadow mt-8">
        <div className="container mx-auto text-center text-gray-600">
          &copy; 2024 Emaz Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
