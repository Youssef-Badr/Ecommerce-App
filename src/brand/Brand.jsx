import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function Brand() {
  let [brands, setBrands] = useState([])

  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let { data, refetch } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  })

  useEffect(() => {
    if (data?.data?.data) {
      setBrands(data.data.data)
    }
  }, [data])

  return (
    <div className="container mx-auto px-4 dark:text-white dark:bg-black">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brand Component</title>
      </Helmet>

      <h1 className="text-green-600 text-center text-3xl font-bold mb-8">All Brands</h1>

      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {brands.map((prod) => (
          <Link to={`/brand/${prod.slug}`} key={prod._id} className="cursor-pointer">
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:border-green-500 transition-all duration-300 p-4 flex flex-col items-center">
              <img src={prod.image} className="w-full h-24 object-contain mb-3" alt={prod.name} />
              <p className="text-center text-lg font-semibold text-gray-800">{prod.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
