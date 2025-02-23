// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4 dark:bg-black dark:text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800  dark:bg-black dark:text-white">
          Welcome Dear,{" "}
          <br className="sm:hidden  dark:bg-black dark:text-white" /> Please Go
          To Login Page
        </h1>
        <Link
          to="/login"
          className="mt-6 px-6 py-3  dark:bg-black dark:text-white bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Go to Login
        </Link>
        <Link
          to="/register"
          className="mt-6 px-6 py-3  dark:bg-black dark:text-white bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Go to Register
        </Link>
      </div>
    </div>
  );
}
