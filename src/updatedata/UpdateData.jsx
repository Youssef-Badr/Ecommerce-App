import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UpdateProfile() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Get the authentication token from localStorage (or context)
  const token = localStorage.getItem("userToken");

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
      phone: Yup.string()
        .matches(/^01[0-9]{9}$/, "Invalid phone number")
        .required("Phone is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
          values,
          {
            headers: { Authorization: `Bearer ${token}` }, // ✅ Send the auth token
          }
        );

        setMessage("Profile updated successfully! 🎉");
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong.");
      }
      setLoading(false);
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-green-600">Update Profile</h2>
      {message && <p className="text-center text-red-500">{message}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          disabled={formik.isSubmitting || loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
