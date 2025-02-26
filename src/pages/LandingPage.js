import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUserToken } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const LandingPage = () => {
  const loggedInUserToken = useSelector(selectLoggedInUserToken);
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500, // Slide change interval
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Big Header with Slideshow */}

      {/* Slideshow */}
      <div className="w-full h-64 mb-64 flex justify-center pt-4">
        <Slider
          {...sliderSettings}
          className="w-4/5 sm:max-w-sm md:max-w-sm lg:max-w-m xl:max-w-m h-64 mt-16"
        >
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-creative-promotion-banner-png-image_4273851.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover z-0 rounded-xl"
            />
          </div>
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src="https://cdn2.vectorstock.com/i/1000x1000/80/81/mega-sale-concept-promotion-banner-vector-26198081.jpg"
              alt="Slide 2"
              className="w-full h-full object-cover z-0 rounded-xl"
            />
          </div>
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src="https://img.freepik.com/premium-vector/abstract-sales-promotion-banner_23-2148340030.jpg"
              alt="Slide 3"
              className="w-full h-full object-cover z-0 rounded-xl"
            />
          </div>
          {/* Add more slides as needed */}
        </Slider>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-4">
        {/* Image of a model */}

        <div className="w-full flex justify-center py-8">
          <img
            src="https://www.shutterstock.com/image-vector/50-percent-price-off-icon-260nw-1929725999.jpg"
            alt="Model"
            className="h-auto max-w-full rounded-xl"
          />
        </div>

        {/* Information Section */}
        <div className="bg-wheatsmoke w-full p-8 text-center border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-500 mb-4">
            Welcome to Our Store 6d93452
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
            <div className="bg-gray-100 shadow-lg p-4 w-1/3 flex flex-col items-center rounded-xl">
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

            <div className="bg-gray-100 shadow-lg p-4 w-1/3 flex flex-col items-center rounded-xl">
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

            <div className="bg-gray-100 shadow-lg p-4 w-1/3 flex flex-col items-center rounded-xl">
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
        <div className="bg-gray-100 shadow-lg p-4 w-1/2 flex flex-col items-center w-3/4 h-64 overflow-hidden rounded-xl">
          <Link
            to={"/product-detail/66b3343be5c4892830b83ebd"}
            className="h-auto max-w-full mb-4 bg-gray-100 w-full h-full object-contain"
          >
            <img
              src="https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/1.png"
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
        <div className="bg-gray-100 shadow-lg p-4 w-1/2 flex flex-col items-center w-3/4 h-64 overflow-hidden rounded-xl">
          <Link
            to={"/product-detail/66b3343be5c4892830b83ebe"}
            className="h-auto max-w-full mb-4 bg-gray-100 w-full h-full object-contain"
          >
            <img
              src="https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/thumbnail.png"
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
        <div className="bg-gray-100 shadow-lg p-4 w-1/2 flex flex-col items-center w-3/4 h-64 overflow-hidden rounded-xl">
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
      {/* <footer className="bg-white w-full py-4 shadow mt-8">
        <div className="container mx-auto text-center text-gray-600">
          &copy; 2024 Emaz Store. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
};

export default LandingPage;
