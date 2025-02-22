import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function VerifyResetCode() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Reset code is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );
        setMessage("Reset code verified! Redirecting to reset password...");
        setTimeout(() => navigate("/resetpass"), 3000);
      } catch (error) {
        setMessage("Error: " + (error.response?.data?.message || "Invalid code!"));
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-green-600">Verify Reset Code</h2>
      <p className="text-center text-gray-500 mb-4">Enter the reset code sent to your email</p>

      {message && <p className="text-center text-red-500">{message}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="resetCode" className="block font-medium text-gray-700">
            Reset Code (Check Email)
          </label>
          <input
            type="text"
            id="resetCode"
            name="resetCode"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.resetCode && formik.errors.resetCode && (
            <p className="text-red-500 text-sm">{formik.errors.resetCode}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          disabled={formik.isSubmitting}
        >
          Verify Code
        </button>
      </form>
    </div>
  );
}
