import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "New password must be at least 6 characters")
        .required("New password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("userToken"); // ✅ Get auth token
        const headers = { Authorization: `Bearer ${token}` };

        await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values, { headers });

        setMessage("Password changed successfully! Redirecting...");
        
        // ✅ Redirect to profile or login
        setTimeout(() => {
          navigate("/updatedata");
        }, 2000);
      } catch (error) {
        setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-green-600">Change Password</h2>
      <p className="text-center text-gray-500 mb-4">Update your password</p>

      {message && <p className="text-center text-red-500">{message}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <p className="text-red-500 text-sm">{formik.errors.currentPassword}</p>
          )}
        </div>

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
          Update Password
        </button>

        {/* <Link to="/updatedata" className="text-green-500">Update Profile</Link> */}

      </form>
    </div>
  );
}
