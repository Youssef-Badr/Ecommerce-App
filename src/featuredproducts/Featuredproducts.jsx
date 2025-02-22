/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// import axios from "axios";
// import React, { useEffect, useState } from "react";
import Items from "../items/Items";
import Loading from "../loading/Loading";
// import { useQuery } from "@tanstack/react-query";
import useProduct from "../hooks/useProduct";
export default function Featuredproducts() {
  // const [productsArr, setProductsArr] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [errMsg, setErrMsg] = useState("");




  let {data , isError , isLoading , error } = useProduct()
    
  if(isLoading) 
    return <Loading></Loading>

  if (isError)
 return <h2>{error.message}</h2>





  // async function getProducts() {
  //   try {
  //     let { data } = await axios.get(
  //       `https://ecommerce.routemisr.com/api/v1/products`
  //     );
  //     setProductsArr(data.data);
  //     setErrMsg("");
  //     setLoading(true);
  //   } catch (error) {
  //     setErrMsg(error.message);
  //     setLoading(false);
  //   }
  // }
  // useEffect(() => {
  //   getProducts();
  // }, []);
  // if (errMsg) {
  //   return <h2>{errMsg}</h2>;
  // }

  return (
    // <div className="container">
    //   <div className="flex flex-wrap">
    //     {productsArr.length ? (
    //       productsArr.map((prod) => <Items prod={prod} key={prod._id}></Items>)
    //     ) : (
    //       <Loading></Loading>
    //     )}
    //   </div>
    // </div>
<div className='container '>

<div className="flex flex-wrap" >

  {data?.map(prod=> <Items prod={prod} key={prod?._id}></Items>)}
</div>


    </div>
  


  );
}
