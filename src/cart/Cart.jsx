import React, { useContext,  useEffect,  useState } from 'react'
import useQueryCart, { getCarts } from '../hooks/useQueryCart'
import useMutationCart, { clearCart, deleteItem, updateCount } from '../hooks/useMutationCart';
import img from '../../src/assets/images/png-transparent-empty-cart-illustration.png'
import Loading from "../loading/Loading";
import Payment from '../payment/Payment';
import { numItem } from '../context/NumCartContext';
import { Helmet } from 'react-helmet';
export default function Cart() {
let {setCartNums } = useContext(numItem)
// setCartNums(data?.data?.numOfCartItems)
// console.log(cartNum);



let {data,isLoading} = useQueryCart(getCarts)
// console.log(data);
let {mutate,isPending} = useMutationCart(deleteItem)
let {mutate:mutateClear,isPending:isPendingClear} = useMutationCart(clearCart)
let {mutate:mutateUpdate,isPending:isPendingUpdate} = useMutationCart(updateCount)
let [isOpen,setOpen] = useState(false)
// console.log(deleteddata);

useEffect(() => {
  if (data?.data?.numOfCartItems !== undefined) {
    setCartNums(data?.data?.numOfCartItems);
    
    
  }
}, [data?.data?.numOfCartItems, setCartNums]); 


if(!data?.data?.numOfCartItems) {
  return <div className='flex justify-center items-center h-screen'>
    <img src={img} className='w-40' alt=""  />
    
  </div>} 

 
  





if(isLoading||isPending||isPendingClear||isPendingUpdate) 
  return <Loading></Loading>



  return (
    <div className="relative w-full md:w-3/4 mx-auto shadow-lg overflow-x-auto my-5 sm:rounded-lg dark:text-white dark:bg-black">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart Component</title>
      </Helmet>

      {/* Cart Summary */}
      <div className="dark:text-white dark:bg-black p-4 bg-white shadow-md rounded-md text-center md:text-left">
        <h1 className="font-bold text-lg sm:text-xl my-4 dark:text-white dark:bg-black">
          Number Of Cart Items: {data?.data?.numOfCartItems}
        </h1>
        <h1 className="font-bold text-lg sm:text-xl my-4 dark:text-white dark:bg-black">
          Total: <span className="text-green-500">{data?.data?.data?.totalCartPrice}</span> EGP
        </h1>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-4 py-3">Product</th>
              <th scope="col" className="px-4 py-3">Qty</th>
              <th scope="col" className="px-4 py-3">Price</th>
              <th scope="col" className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.data?.data?.products.map((prod) => (
              <tr
                key={prod?.product?._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {/* Product Image */}
                <td className="p-4">
                  <img src={prod?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                </td>

                {/* Product Title */}
                <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                  {prod?.product?.title}
                </td>

                {/* Quantity Control */}
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    {/* Decrease Qty */}
                    <button
                      onClick={() => mutateUpdate({ productId: prod?.product?._id, count: prod?.count - 1 })}
                      className="p-1 text-gray-500 bg-white border rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 18 2" fill="none">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>

                    {/* Quantity Input */}
                    <input
                      type="number"
                      className="w-12 text-center border rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={prod?.count}
                      readOnly
                    />

                    {/* Increase Qty */}
                    <button
                      onClick={() => mutateUpdate({ productId: prod?.product?._id, count: prod?.count + 1 })}
                      className="p-1 text-gray-500 bg-white border rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 18 18" fill="none">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>

                {/* Price */}
                <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                  {prod?.price} EGP
                </td>

                {/* Remove Button */}
                <td className="px-4 py-4">
                  <button
                    onClick={() => mutate(prod?.product?._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                  >
                    Remove <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4">
        <button onClick={mutateClear} className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
          Clear
        </button>

        <button onClick={() => setOpen(!isOpen)} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition mt-4 sm:mt-0">
          Pay Online
        </button>
      </div>

      {/* Payment Component */}
      {isOpen && <Payment cartId={data?.data?.cartId} />}
    </div>
  );
};





 