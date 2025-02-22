import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ForgetPassword() {
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );
        setMessage("Password reset link sent! Check your email.");
      } catch (error) {
        setMessage("Error: " + (error.response?.data?.message || "Try again!"));
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-green-600">Forgot Password</h2>
      <p className="text-center text-gray-500 mb-4">Enter your email to reset your password</p>

      {message && <p className="text-center text-red-500">{message}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          disabled={formik.isSubmitting}
        >
          Send Reset Link
        </button>
        <p className="text-center">
  Entered your email? <a href="/verifyreset" className="text-green-500">Verify Reset Code</a>
</p>

      </form>
    </div>
  );
}
