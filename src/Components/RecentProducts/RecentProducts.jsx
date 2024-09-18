import React from 'react'
import Style from './RecentProducts.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import ProductItem from '../ProductItem/ProductItem'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import UseProducts from '../../Hooks/UseProducts'
axios

export default function RecentProducts() {
 

const {data: prods ,error, isError, isLoading } = UseProducts();
  


if (isLoading) {
  return <Loading />;
}

if(isError){
  return <h3>{error.message}</h3>
}

return(
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            { 
            prods?.map((p) => <ProductItem key={p._id} products={p}/>
            
          )}
         
          
      </div>
    ) 


    
  return (
    <div>
     
    </div>
  )
}
//  <h2>Home</h2>
{/* <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
{
  data.length == 0? <>loading....</> : 
  data.map(function(p){
    return <>
    <div className="group w-full">
      <img
      className='m-3' 
      src={p.imageCover}
       alt="" />
      <h3 className='h3 font-semibold text-green-500'>{p.title.split(' ').slice(0,2).join(' ')}</h3>
      <p className='line-clamp-3 dark:text-white'>{p.description}</p>
      <button 
       className="w-full m-3 transition-all duration-500 text-white opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
       Add to Cart
      </button>
    </div>
    </>
  })
}
</div> */}