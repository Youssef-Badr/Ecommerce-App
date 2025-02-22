import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // ✅ Get email passed from VerifyResetCode page

  const formik = useFormik({
    initialValues: {
      email: email || "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values);
        
        setMessage("Password reset successful! Redirecting...");
        
        // ✅ Redirect to login page
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-green-600">Reset Password</h2>
      <p className="text-center text-gray-500 mb-4">Enter your new password</p>

      {message && <p className="text-center text-red-500">{message}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          disabled={formik.isSubmitting}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
