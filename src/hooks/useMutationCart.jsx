/* eslint-disable no-unreachable */
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React from "react";
// import Product from '../product/Product'
import { useMutation, useQueryClient } from "@tanstack/react-query";

let token = localStorage.getItem('token');
// function add to cart
export function addToCart(productId) {
  return axios.post(
    'https://ecommerce.routemisr.com/api/v1/cart',{ productId },
    
    {
      headers: {
        token,
      }
    })
}

// function delete from cart 

export function deleteItem(productId) {
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`
    
    ,{
      headers: {
        token,
      }
    })
}
// function clear cart 

export function clearCart() {
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart`
    
    ,{
      headers: {
        token,
      }
    })
}
// function clear cart 

export function updateCount({productId,count}) {
  return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count}
    
    ,{
      headers: {
        token,
      }
    })
}


export default function useMutationCart(fn) {
    const queryClient = useQueryClient();
  return useMutation({ mutationFn: fn , onSuccess:()=>{
    queryClient.invalidateQueries({ queryKey: ['cart'] })
  } });
}



