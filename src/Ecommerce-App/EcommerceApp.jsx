/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

export default function EcommerceApp() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
        Welcome Dear, <br className="sm:hidden" /> Please Go To Login Page
      </h1>
      <Link
        to="/login"
        className="mt-6 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
      >
        Go to Login
      </Link>
    </div>
  );
}
