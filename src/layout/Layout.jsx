/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import img from '../assets/images/light-patten.svg'

// eslint-disable-next-line react/display-name
export default function () {
  return (
    <div style={{backgroundImage:`url(${img})`}} className='flex flex-col justify-between min-h-screen dark:text-white dark:bg-black'>
      <Navbar/>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}
