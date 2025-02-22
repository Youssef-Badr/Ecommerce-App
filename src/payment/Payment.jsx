/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { paymentOnline } from "../Api/payment";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as motion from "motion/react-client";

export default function Payment({ cartId }) {
  let { data, mutate } = useMutation({ mutationFn: paymentOnline });
  console.log(data);

  function handlePayment(shippingAddress) {
    mutate({ cartId, shippingAddress });
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: handlePayment,
    validationSchema: Yup.object({
          details: Yup.string()
            .min(5, "Details must be at least 5 characters")
            .required("Details are required"),
          city: Yup.string().required("City is required"),
          phone: Yup.string()
            .matches(/^(01)[0-9]{9}$/, "Phone must be a valid Egyptian number (e.g., 01234567890)")
            .required("Phone is required"),
    
  })
  });




  
  

  if (data?.data?.status === "success")
    window.location.href = data?.data?.session?.url;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <h2 className="my-4 text-2xl font-extrabold text-center ">Payment</h2>

      {/* <form
        action=""
        onSubmit={formik.handleSubmit}
        className="flex flex-col space-y-4"
      >
       
        <div className="flex flex-col">
          <label htmlFor="details" className="text-gray-700 font-medium mb-1">
            Details
          </label>
          <input
            type="text"
            id="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        
        <div className="flex flex-col">
          <label htmlFor="city" className="text-gray-700 font-medium mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700 font-medium mb-1">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

       
        <button
          type="submit"
          className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form> */}


<form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4 mb-8 p-6 bg-white shadow-md rounded-lg w-full max-w-md mx-auto">
      
      
      <div className="flex flex-col">
        <label htmlFor="details" className="text-gray-700 font-medium mb-1">Details</label>
        <input
          type="text"
          id="details"
          {...formik.getFieldProps("details")}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.details && formik.errors.details ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"}`}
        />
        {formik.touched.details && formik.errors.details ? (
          <p className="text-red-500 text-sm mt-1">{formik.errors.details}</p>
        ) : null}
      </div>

      
      <div className="flex flex-col">
        <label htmlFor="city" className="text-gray-700 font-medium mb-1">City</label>
        <input
          type="text"
          id="city"
          {...formik.getFieldProps("city")}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.city && formik.errors.city ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"}`}
        />
        {formik.touched.city && formik.errors.city ? (
          <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
        ) : null}
      </div>

     
      <div className="flex flex-col">
        <label htmlFor="phone" className="text-gray-700 font-medium mb-1">Phone</label>
        <input
          type="text"
          id="phone"
          {...formik.getFieldProps("phone")}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.phone && formik.errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"}`}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
        ) : null}
      </div>

     
      <button type="submit" className="p-3  bg-green-500 text-white rounded-md hover:bg-green-600 transition">
        Submit
      </button>
      
    </form>
    </motion.div>
  );
}
