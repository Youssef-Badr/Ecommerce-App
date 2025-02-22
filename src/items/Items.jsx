/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import useMutationCart, { addToCart } from '../hooks/useMutationCart';
import toast from 'react-hot-toast';

export default function Items({prod}) {
 let {imageCover ,id, title , price , category,ratingsAverage,priceAfterDiscount} = prod;
 
let {data , mutate,error,isSuccess,isError} = useMutationCart(addToCart)
// console.log(data?.data);
// console.log(error?.response?.data?.message);

if(isSuccess) 
   toast.success(data?.data?.message)

if(isError) 
   toast.error(error?.response?.data?.message)
// useEffect(() => {
  // if (isSuccess) {
  //   toast.success(data?.data?.message);
  // }
  // if (isError) {
  //   toast.error(error?.response?.data?.message);
  // }
// }, [isSuccess, isError, data, error]);


  return (
    <div className='product cursor-pointer lg:w-1/6 md:w-1/3 sm:w-1/2 w-full p-4 dark:text-white dark:bg-black'>
<Link to={`/productdetails/${id}/${category?._id}`}>
    <img src={imageCover} className='w-full' alt="" />
    <p className='text-green-color text-sm font-bold dark:text-white dark:bg-black'>{category?.name}</p>
    <p className='dark:text-white dark:bg-black'>{title}</p>
    <div className='flex justify-between dark:text-white dark:bg-black'>
        <div>
        <p className={priceAfterDiscount?'line-through':''}>{price} EGP</p> 
        <p>{priceAfterDiscount?priceAfterDiscount + 'EGP':''} </p>
        </div>
        <div><span className='dark:text-white dark:bg-black'>{ratingsAverage} <i className='fa-solid fa-star text-yellow-400'></i>
            </span></div>

    </div>
</Link>
    <button onClick={() => mutate(id)} className='btn bg-green-500 p-3 mt-2 rounded text-green-color'>add to cart</button>

    </div>
  )
}





