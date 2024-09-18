import React from 'react'
import Style from './CartItem.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'

export default function CartItem({updateFn ,deleteFn ,count , price , product ,load}) {
  
  
  
  return (
  <tr>
     
    <td>
      <img src={product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product?.title}   />
    </td>
   <td>
   <div className="flex items-center justify-center">{product?.title}</div>
   </td>
  <td>
  <div className="flex items-center ">
    <button 
    onClick={()=>updateFn(product.id,count-1)}
    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
      <span className="sr-only">Quantity button</span>
      {load?
        <FaSpinner className='animate-spin'/>
        : <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
      </svg>
      }
      
    </button>
    <div>
      <span>{count}</span>
    </div>
    <button
    onClick={()=>updateFn(product.id,count+1)}
    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
      <span className="sr-only">Quantity button</span>
      {load? <FaSpinner className='animate-spin'/>
      : <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
    </svg>}
    </button>
  </div>
  </td>
  <td>
  <div className="flex items-center">{price}EGP</div>
  </td>
  <td>
  <span  
  onClick={()=> deleteFn(product.id)} 
  className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline flex items-center">
    Remove</span>
  </td>

  </tr>

  )
}
