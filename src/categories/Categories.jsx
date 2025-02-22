/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

export default function Categories() {
  var settings = {
    dots: true,
    infinite:true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  }

let [cats,setCats] = useState([])

async function getCat() {
  
let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
setCats(data.data);
console.log(data?.data);



}

useEffect(()=>{
getCat()

},[])

  return (
    <div className='my-10 container '>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Caregories Component</title>
            </Helmet>
<Slider {...settings}>
{cats.map(ele=> <CatItem ele={ele} key={ele._id}></CatItem>)}
</Slider>


<div className="grid grid-cols-1 p-10 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {cats.map(prod => (
    <Link to={`/categories/${prod.slug}`} key={prod._id} className="p-4 cursor-pointer">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-transparent hover:border-green-500 transition-all duration-200">
        <img src={prod.image} className="w-full h-48 object-cover" alt={prod.name} />
        <div className="p-4">
          <p className="text-center text-lg font-semibold text-green-600">{prod.name}</p>
        </div>
      </div>
    </Link>
  ))}
</div>










    </div>
  )
}


function  CatItem({ele}) {
  
    return <div className="container mb-4 hidden md:block">
            <img src={ele.image} className='object-cover h-[200px]' alt="" />
            

          </div>
    
    
    
 


}