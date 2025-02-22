/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import Items from "../items/Items";
import useMutationCart, { addToCart } from "../hooks/useMutationCart";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetails() {
  let { data, mutate, error, isSuccess, isError } = useMutationCart(addToCart);

  if (isSuccess) toast.success(data?.data?.message);
  if (isError) toast.error(error?.response?.data?.message);

  let [relatedProduct, setRelatedProduct] = useState([]);
  let [loading, setLoading] = useState(false);
  let [imgSrc, setImgSrc] = useState("");
  let [ind, setInd] = useState(0);
  let { id, catId } = useParams();

  async function getProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data: dataObj, isLoading } = useQuery({
    queryKey: ["productDetails", id], 
    queryFn: getProductDetails,
    select: (dataObj) => dataObj?.data?.data,
  });

  async function getRelatedProduct() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`
      );
      setRelatedProduct(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getRelatedProduct();
  }, []);

  if (isLoading) return <Loading />;

  function changeSrc(e) {
    setInd(e.target.getAttribute("index"));
    setImgSrc(e.target.src);
  }

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4">
      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row items-center gap-6 py-5">
        {/* Product Image & Thumbnails */}
        <div className="w-full lg:w-1/2">
          <img 
            src={imgSrc ? imgSrc : dataObj?.imageCover}  
            className="w-full h-72 md:h-96 object-cover rounded-lg shadow-md" 
            alt={dataObj?.title} 
          />

          {/* Thumbnail Images */}
          <div className="flex gap-3 pt-5 flex-wrap justify-center">
            {dataObj?.images?.map((img, index) => (
              <img 
                src={img} 
                onClick={changeSrc} 
                className={`w-[20%] md:w-[15%] cursor-pointer transition-all scale-95 rounded-lg shadow-sm ${
                  index === ind ? 'border-4 border-green-500 opacity-100' : 'opacity-55'
                }`} 
                key={img} 
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 space-y-4">
          <p>
            <span className="text-green-500 font-bold">Brand Name: </span>
            {dataObj?.brand?.name}
          </p>
          <p>
            <span className="text-green-500 font-bold">Title: </span>
            {dataObj?.title}
          </p>
          <p>
            <span className="text-green-500 font-bold">Description: </span>
            {dataObj?.description}
          </p>

          {/* Category, Rating & Price */}
          <div className="flex flex-wrap justify-between items-center">
            <h3 className="font-semibold text-sm">{dataObj?.category?.name}</h3>
            <div>
              <h3 className="font-semibold text-sm">
                {dataObj?.ratingsAverage} <i className="fa-solid fa-star text-yellow-500"></i>
              </h3>
              <h3 className="font-semibold text-lg text-green-600">{dataObj?.price} EGP</h3>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={() => mutate(dataObj?._id)} 
            className="bg-green-500 hover:bg-green-600 text-white w-full py-3 my-3 rounded-lg transition-all">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
<h2 className="text-green-500 text-center font-bold py-5 text-3xl md:text-4xl">
  Related Products
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {relatedProduct.length ? (
    relatedProduct.map((prod) => (
      <div 
        key={prod._id} 
        className="bg-gray-900 text-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all"
      >
        <img 
          src={prod.imageCover} 
          alt={prod.title} 
          className="w-full h-48 object-contain mx-auto rounded-md"
        />
        <h3 className="font-bold text-lg mt-2">{prod.category?.name}</h3>
        <p className="text-sm text-gray-300">{prod.title}</p>
        <p className="text-yellow-400 font-bold">{prod.price} EGP</p>
        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 w-full rounded mt-2">
          Add to Cart
        </button>
      </div>
    ))
  ) : (
    <Loading />
  )}
</div>

    </div>
  );
}
