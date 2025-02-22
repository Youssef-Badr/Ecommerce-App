// import {  useQuery } from '@tanstack/react-query'
// import axios from 'axios'
import React from 'react'
import Items from '../items/Items'
import Loading from '../loading/Loading'
import useProduct from '../hooks/useProduct'
import { Helmet } from 'react-helmet'

export default function Product() {



  
 let {data , isError , isLoading , error } =useProduct()

  if(isLoading) 
    return <Loading></Loading>

  if (isError)
 return <h2>{error.message}</h2>

  
  




  return (


    <div className='container'>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Product Component</title>
            </Helmet>

<div className="flex flex-wrap" >

  {data.map(prod=> <Items prod={prod} key={prod?._id}></Items>)}
</div>


    </div>
  )
}
