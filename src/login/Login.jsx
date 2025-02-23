/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userToken } from "../context/UserToken";
export default function Login() {
  let { setLogin } = useContext(userToken);

  let navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string().required("required").email("email not valid"),
    password: Yup.string()
      .required("required")
      .matches(/^[A-Z][a-z0-9]{2,5}$/),
  });

  let [errMsg, setErrMsg] = useState("");
  let [loading, setLoading] = useState(false);

  async function handleLogin(values) {
    setLoading(true);
    console.log("Sending values:", values);

    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      // console.log(data);
      setLoading(false);
      setErrMsg("");
      if (data.message === "success") {
        localStorage.setItem("token", data.token);

        setLogin(data.token);
        navigate("/cart");
      }
    } catch (error) {
      setErrMsg("email or password is incorrect");
      setLoading(false);
      //   if (error.response) {
      //     console.error("Error Response:", error.response.data);
      //     setErrMsg(error.response.data.message || "Invalid request");
      //   } else {
      //     console.error("Network Error:", error.message);
      //     setErrMsg("Network error. Check your internet connection.");
      //   }
    }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  // console.log(formik);

  return (
    <div className="container">
      <h2 className="text-[1.5rem] font-bold my-3">login Now:</h2>

      <form className="max-w-md mx-auto  " onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer"
            placeholder=" "
          />
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg  bg-gray"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : (
            ""
          )}

          {errMsg ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg  bg-gray"
              role="alert"
            >
              <span className="font-medium">{errMsg}</span>
            </div>
          ) : (
            ""
          )}

          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-color peer-focus:dark:text-green-color peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-color focus:outline-none focus:ring-0 focus:border-green-color peer"
            placeholder=" "
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="p-4 mb-4 text-sm rounded-lg bg-gray" role="alert">
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : (
            ""
          )}
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-color peer-focus:dark:text-green-color-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          <p className="text-center text-gray-600 mt-4">
  Forgot Your Password? <Link to="/forgetpass" className="text-green-500 hover:underline">Reset here</Link>
</p>
          <p className="text-center text-gray-600 mt-4">
  Change Your Password? <Link to="/changepass" className="text-green-500 hover:underline">Click here</Link>
</p>

        </div>

        <button
          type="submit"
          className="text-white bg-black bg-green-color hover:bg-green-color focus:ring-4 focus:outline-none focus:ring-green-color font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-color-600 dark:hover:bg-green-color-700 dark:focus:ring-green-color-800"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin text-rating-color"></i>
          ) : (
            "login"
          )}
        </button>
      </form>
    </div>
  );
}
