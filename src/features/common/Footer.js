import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-200 to-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
        {/* Company Info Section */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Ecommerce</h2>
          <p className="text-sm mb-4">
            We provide the best products for your needs with top-notch quality
            and service.
          </p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>

        {/* Useful Links Section */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Useful Links</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/shop"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/faq"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Return Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              <i className="fab fa-facebook-f text-lg"></i> Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              <i className="fab fa-twitter text-lg"></i> Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              <i className="fab fa-instagram text-lg"></i> Instagram
            </a>
          </div>
        </div>

        {/* Newsletter Section */}
      </div>

      {/* Payment Methods Section */}
      <div className="mt-8 border-t border-gray-700 pt-6">
        <div className="container mx-auto flex justify-between items-center px-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
