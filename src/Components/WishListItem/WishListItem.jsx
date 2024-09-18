import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaSpinner, FaTrash } from 'react-icons/fa'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext'

useContext
WishListContext
CartContext


export default function WishListItem({product , deleteFn , setWishListDetails , wishListDetails}) {
  
  
  const {addItemToCart,setCartItems} = useContext(CartContext)
  async function addItem(id){
    const response = await addItemToCart(id)
    console.log(response.data)
    if(response.data.status == "success"){
      setCartItems(response.data.numOfCartItems)
      toast.success("added" ,{
        style: {
          backgroundColor: "green" , color: "white"
        },
        position: "top-right"
      })
      
    }

    
  }
 

  
  return (
  <>
     <div className="xs:block sm:flex sm:justify-between">
     <div className="block sm:flex gap-2">
      <img src={product?.imageCover} className="block w-full sm:inline-block sm:w-32 md:w-40 sm:max-w-full sm:max-h-full" alt={product?.title}   />
      <div className='items-center my-auto'>
      <div className="flex font-semibold text-black text-lg">{product?.title}</div>
    <div className="flex font-medium text-green-600 text-lg my-2">{product?.price}EGP</div>
  <span  
    onClick={()=> deleteFn(product._id)} 
   className="flex font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline  items-center">
    <FaTrash />
    Remove</span>
      </div>
    </div>
    <button 
       onClick={()=>addItem(product._id)}
       className="my-auto w-fit h-fit text-white  bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
       +Add to Cart
      </button>
    
     </div>
 
    
  
 
  

  </>

  )
}
