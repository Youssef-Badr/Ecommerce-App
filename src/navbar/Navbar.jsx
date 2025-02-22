/* eslint-disable react/jsx-no-undef */
import React, { useContext, useEffect, useRef } from "react";
import logo from "../assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { userToken } from "../context/UserToken";
import { numItem } from "../context/NumCartContext";
export default function Navbar() {



let { isLogin ,setLogin} = useContext(userToken);
let {cartNum} = useContext(numItem)



let ref = useRef(null)

let navigate = useNavigate();
    function logout() {
    localStorage.removeItem('token');
    setLogin(null);
    navigate('/')
  }
useEffect(() => {
if(localStorage.getItem('theme')){
  document.body.classList.add('dark')
ref.current.checked= true}

}, [])
  function toggleMe(){
    // console.log(ref.current);
    let body= document.body;

    if (ref.current.checked) {
      body.classList.add('dark');
      localStorage.setItem('theme','dark')
    }else {
      body.classList.remove('dark')
      localStorage.removeItem('theme')

    }

    
  }
  


  return (
    <nav className="bg-light-color  border-gray-200 dark:bg-black">
      <div className="max-w-screen-xl flex flex-wrap justify-between lg:justify-start items-center  mx-auto p-4">
        <Link
          to="/"
          className="flex w-[20%] items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="" alt="Logo" />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden  lg:flex lg:justify-between  w-[80%] "
          id="navbar-default"
        >
          <ul className=" font-medium flex flex-col p-4 lg:p-0 mt-4 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 dark:bg-black lg:dark:bg-black dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3   rounded-sm lg:bg-transparent  lg:p-0 dark:text-white "
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className="block py-2 px-3 text-black rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-white dark:hover:bg-white dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                product
              </Link>
            </li>
            {isLogin && (
              <li>
                <Link
                  to="/cart"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                   <i className="fa-solid fa-shopping-cart" ></i> &nbsp;

                  <span className="bg-slate-600 p-1 font-bold rounded">{cartNum}</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/categories"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/brand"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Whitelist
              </Link>
            </li>
          </ul>
          <ul className=" font-medium flex flex-col p-4 lg:p-0 mt-4 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 dark:bg-black lg:dark:bg-black dark:border-gray-700">
            {isLogin ? (
              <li  onClick={logout}>
                <span
                  href="#"
                  className="cursor-pointer block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  logout
                </span>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
  <input type="checkbox" name="toggle" onChange={toggleMe} ref={ref} id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
  <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" />
</div>

            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
