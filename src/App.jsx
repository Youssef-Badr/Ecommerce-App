/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React from 'react'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './home/Home'
import Login from './login/Login'
import Register from './register/Register'
import Categories from './categories/Categories'
import Brand from './brand/Brand'
import Product from './product/Product'
import Navbar from './navbar/Navbar'
import Loading from './loading/Loading'
import Cart from './cart/Cart'
import Notfound from './notfound/Notfound'
import ProtectedRoute from './protected/ProtectedRoute';
import ProductDetails from './productdetails/ProductDetails';
import Orders from './orders/Orders';
import Whitelist from './whitelist/Whitelist';
import ForgetPass from './forgetpass/Forgetpass';
import VerifyReset from './verifyreset/VerifyReset';
import Changepass from './changepass/Changepass';
import UpdateData from './updatedata/UpdateData';
import Resetpass from './resetpass/Resetpass';

export default function App() {
 let routes = createBrowserRouter([{
    path:'/',element:<Layout></Layout>,children:[
      {index:true,element:<Home></Home>},
      {path:'/login',element:<Login></Login>},
      {path:'/forgetpass',element:<ForgetPass></ForgetPass>},
      {path:'/verifyreset',element:<VerifyReset></VerifyReset>},
      {path:'/resetpass',element:<Resetpass></Resetpass>},
      {path:'/changepass',element:<Changepass></Changepass>},
      {path:'/updatedata',element:<UpdateData></UpdateData>},
      {path:'/register',element:<Register></Register>},
      {path:'/cart',element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'/categories',element:<Categories></Categories>},
      {path:'/navbar',element:<Navbar></Navbar>},
      {path:'/loading',element:<Loading></Loading>},
      {path:'/brand',element:<Brand></Brand>},
      {path:'/product',element:<Product></Product>},
      {path:'/allorders',element:<Orders></Orders>},
      {path:'/whitlist',element:<Whitelist></Whitelist>},
      {path:'/productdetails/:id/:catId',element:<ProductDetails></ProductDetails>},
      {path:'*',element:<Notfound></Notfound>},




    ]
  }])
  return (
    <RouterProvider router={routes}>App</RouterProvider>
  )
}
