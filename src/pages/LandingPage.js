import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUserToken } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaShoppingBag, FaTag, FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LandingPage = () => {
  const loggedInUserToken = useSelector(selectLoggedInUserToken);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col mt-16">
      {/* Hero Section with Slideshow */}
      <div className="w-full h-[calc(100vh-4rem)] relative overflow-hidden">
        <Slider {...sliderSettings} className="w-full h-full">
          <div className="relative h-screen">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070"
              alt="Modern Shopping Experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl mx-auto px-4">
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome to Our Store
                </h1>
                <p className="text-2xl mb-8">Discover Amazing Products</p>
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-shadow">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="relative h-[70vh]">
            <img
              src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2015"
              alt="Summer Sale"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Summer Sale</h1>
                <p className="text-xl">Up to 50% Off on Selected Items</p>
                <button className="mt-6 bg-white text-gray-900 px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                  View Deals
                </button>
              </div>
            </div>
          </div>
          <div className="relative h-[70vh]">
            <img
              src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2015"
              alt="New Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">New Collection</h1>
                <p className="text-xl">Explore Our Latest Arrivals</p>
                <button className="mt-6 bg-white text-gray-900 px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
          <div className="relative h-[70vh]">
            <img
              src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2015"
              alt="Premium Brands"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Premium Brands</h1>
                <p className="text-xl">Shop Top Designer Collections</p>
                <button className="mt-6 bg-white text-gray-900 px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                  Discover More
                </button>
              </div>
            </div>
          </div>
        </Slider>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <FaShoppingBag className="text-5xl text-blue-500 mb-4" />
          <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Wide Selection
          </h3>
          <p className="text-gray-600">
            Browse through our extensive collection of products
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <FaTag className="text-5xl text-green-500 mb-4" />
          <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Best Prices
          </h3>
          <p className="text-gray-600">
            Get the best deals and discounts on all products
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <FaStar className="text-5xl text-yellow-500 mb-4" />
          <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Quality Assured
          </h3>
          <p className="text-gray-600">
            All products are quality checked and verified
          </p>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <Link to="/product-detail/66b3343be5c4892830b83f07">
                <div className="relative overflow-hidden group">
                  <img
                    src="https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png"
                    alt="Product 1"
                    className="w-full h-64 object-contain p-4 transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <button className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Apple MacBook Pro 14 Inch
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Premium laptop with powerful performance
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      $1,999
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <Link to="/product-detail/66b3343be5c4892830b83f1d">
                <img
                  src="https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/thumbnail.png"
                  alt="Product 2"
                  className="w-full h-64 object-contain p-4"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Apple Airpods</h3>
                  <p className="text-gray-600">
                    Wireless earbuds with premium sound
                  </p>
                </div>
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <Link to="/product-detail/66b3343be5c4892830b83efb">
                <img
                  src="https://cdn.dummyjson.com/products/images/kitchen-accessories/Microwave%20Oven/thumbnail.png"
                  alt="Product 3"
                  className="w-full h-64 object-contain p-4"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Microwave Oven</h3>
                  <p className="text-gray-600">
                    Modern kitchen appliance for quick cooking
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-sm"></div>
              <Link to="/product-detail/66b3343be5c4892830b83f0c">
                <img
                  src="https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/thumbnail.png"
                  alt="Special Offer 1"
                  className="w-full h-96 object-contain p-4 transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">
                    Blue & Black Check Shirt
                  </h3>
                  <p className="text-xl mb-4">Limited time offer - 30% off</p>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold w-fit hover:bg-blue-50 transition-colors">
                    Shop Now
                  </button>
                </div>
              </Link>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <Link to="/product-detail/66b3343be5c4892830b83f16">
                <img
                  src="https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/thumbnail.png"
                  alt="Special Offer 2"
                  className="w-full h-64 object-contain p-4"
                />
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    Brown Leather Belt Watch
                  </h3>
                  <p className="text-white opacity-90">
                    Special price - 25% off
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                YourStore
              </h3>
              <p className="text-gray-400">
                Your one-stop shop for all your needs. Quality products at the
                best prices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Categories</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/electronics"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/fashion"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/home"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home & Living
                  </Link>
                </li>
                <li>
                  <Link
                    to="/beauty"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Beauty
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
              <p className="text-gray-400 mb-4">Email: info@store.com</p>
              <p className="text-gray-400 mb-4">Phone: +1 234 567 890</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaShoppingBag className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTag className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaStar className="text-xl" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Your Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
