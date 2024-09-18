import React from 'react'
import Style from './Products.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import ProductItem from '../ProductItem/ProductItem'
import axios from 'axios'
axios

export default function Products() {

  const {data: prods ,error, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn:() => axios.get('https://ecommerce.routemisr.com/api/v1/products'),
    select: (data) => data.data.data,
    staleTime: 10*1000,

  })
  
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
}
