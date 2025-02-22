import React from 'react'
import Header from '../header/Header'
import Categories from '../categories/Categories'
import Featuredproducts from '../featuredproducts/Featuredproducts'
import {useContext}  from 'react'
import { counterContext } from '../context/CounterContext';
import { Helmet } from 'react-helmet'

export default function Home() {
let {counter, increase} = useContext(counterContext);

  return (<div className='dark:text-white'> 
     <Helmet>
                <meta charSet="utf-8" />
                <title>Home Component</title>
            </Helmet>
    
  <Header/>
  <Categories></Categories>
  <Featuredproducts></Featuredproducts>
  <h1 className='texr-green-color' onClick={increase}>{counter}</h1>

  </div>
   
  )
}
