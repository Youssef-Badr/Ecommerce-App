import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          {/* Brand */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold text-green-500">Fresh Cart</h2>
            <p className="text-gray-400 mt-2 text-sm">Your favorite online store</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center space-x-6 text-sm ">
            <Link to="/" className="hover:text-green-400 transition text-white">Home</Link>
            <Link to="/product" className="hover:text-green-400 transition text-white">Product</Link>
            <Link to="/cart" className="hover:text-green-400 transition text-white">Cart</Link>
            <Link to="/brand" className="hover:text-green-400 transition text-white">Brand</Link>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 text-white">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 text-white ">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 text-white">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-10 text-center">
          <h3 className="text-lg font-semibold mb-3">Subscribe to our Newsletter</h3>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-md border-none focus:ring-green-500 w-64 text-gray-800"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Fresh Cart. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
