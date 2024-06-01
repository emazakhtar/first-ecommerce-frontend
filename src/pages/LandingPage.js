import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Big Header */}
      <header className="bg-indigo-700 w-full h-[60vh] flex flex-col justify-end relative">
        {/* Sub-header */}
        <div className="py-4 shadow-md w-3/4 mx-auto mt-2 bg-gray-200 p-4 text-center relative z-10">
          <nav className="container mx-auto flex justify-around items-center">
            <a href="/all-products" className="text-gray-800">
              All Products
            </a>
            <a href="#home" className="text-gray-800">
              Home
            </a>
            <a href="#men" className="text-gray-800">
              Men
            </a>
            <a href="#women" className="text-gray-800">
              Women
            </a>
            <a href="#kids" className="text-gray-800">
              Kids
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-4">
        {/* Image of a model */}
        <div className="w-full flex justify-center py-8">
          <img
            src="https://via.placeholder.com/600x400"
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
          <div className="bg-gray-200 p-4 w-1/2 text-center">
            <p className="text-gray-600">Check out our latest arrivals!</p>
          </div>
        </div>

        {/* Product Section */}
        <div className="w-full py-8 flex justify-center">
          <div className="flex justify-between space-x-4 max-w-7xl mx-auto">
            <div className="bg-white shadow-lg p-4 w-1/3 flex flex-col items-center">
              <img
                src="https://via.placeholder.com/200x300"
                alt="Product 1"
                className="h-auto max-w-full mb-4"
              />
              <p className="text-gray-600">Product 1</p>
            </div>
            <div className="bg-white shadow-lg p-4 w-1/3 flex flex-col items-center">
              <img
                src="https://via.placeholder.com/200x300"
                alt="Product 2"
                className="h-auto max-w-full mb-4"
              />
              <p className="text-gray-600">Product 2</p>
            </div>
            <div className="bg-white shadow-lg p-4 w-1/3 flex flex-col items-center">
              <img
                src="https://via.placeholder.com/200x300"
                alt="Product 3"
                className="h-auto max-w-full mb-4"
              />
              <p className="text-gray-600">Product 3</p>
            </div>
          </div>
        </div>
      </main>
      {/* Small Div */}
      <div className="w-full py-4 flex justify-center">
        <div className="bg-gray-200 p-4 w-1/2 text-center">
          <p className="text-gray-600">Check out our latest arrivals!</p>
        </div>
      </div>

      {/* Product 1 */}
      <div className="w-full py-8 flex justify-center">
        <div className="bg-white shadow-lg p-4 w-1/2 flex flex-col items-center">
          <img
            src="https://via.placeholder.com/200x300"
            alt="Product 1"
            className="h-auto max-w-full mb-4"
          />
          <p className="text-gray-600">Product 1</p>
        </div>
      </div>

      {/* Product 2 */}
      <div className="w-full py-8 flex justify-center">
        <div className="bg-white shadow-lg p-4 w-1/2 flex flex-col items-center">
          <img
            src="https://via.placeholder.com/200x300"
            alt="Product 2"
            className="h-auto max-w-full mb-4"
          />
          <p className="text-gray-600">Product 2</p>
        </div>
      </div>

      {/* Product 3 */}
      <div className="w-full py-8 flex justify-center">
        <div className="bg-white shadow-lg p-4 w-1/2 flex flex-col items-center">
          <img
            src="https://via.placeholder.com/200x300"
            alt="Product 3"
            className="h-auto max-w-full mb-4"
          />
          <p className="text-gray-600">Product 3</p>
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
