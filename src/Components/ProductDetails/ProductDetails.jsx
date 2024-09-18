import React from 'react'
import Style from './ProductDetails.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { FaHeart, FaStar } from 'react-icons/fa'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../Context/CartContext'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext'
import { UserContext } from '../../Context/UserContext'



export default function ProductDetails() {
  const {setWishListed,addItemToWishList,wishListed} = useContext(WishListContext)
  const {token} =   useContext(UserContext)
// console.log(token)
  const {id} = useParams()
  
  const {data: ProductDetails , isLoading , isError ,error}=  useQuery({
    queryKey: ['productDetails' , id],
    queryFn: ()=>axios.get('https://ecommerce.routemisr.com/api/v1/products/' + id),
    select: (data) => data.data.data
  })
  
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
  const [wishState, setWishState] = useState(localStorage.getItem(`${token}_${id}`))

  async function addWishItem(id){
    const response = await addItemToWishList(id)
    console.log(response.data)
    
    if(response.data.status == "success"){
      
      setWishListed(response.data.data)
      console.log("wishlisted items: " + wishListed)
      const newWishState = !wishState ? true : false;
      setWishState(!wishState);
      localStorage.setItem(`${token}_${id}`, newWishState); 
        if(!wishState){
          toast.success(response.data.message ,{
            style: {
              backgroundColor: "green" , color: "white"
            },
            position: "top-right"
          })
        }
        else{
          toast.success("Removed from wishlist" ,{
            style: {
              backgroundColor: "green" , color: "white"
            },
            position: "top-right"
          })
        }
        
        
    }
  }


  //  const [ProductDetails, setProductDetails] = useState(null)
  // console.log(x);  
  

    
    
  return (
    <>
    
    <div className="h2 dark:text-gray-200 my-3">Product Details</div>
    {isLoading? <Loading />:
    <div className='grid sm:grid-cols-12  gap-4'>
    <div className="col-span-4">
        <img 
        src={ProductDetails?.imageCover}
        className='w-full'
         alt="" />
    </div>
    <div className="col-span-8 m-3 dark:text-white">
      <div className="h3 font-bold dark:text-green-500">{ProductDetails.title}</div>
      <p className='font-light my-3'>{ProductDetails.description}</p>
       <div className="h5 font-medium dark:text-gray-400">{ProductDetails.category.name}</div>
       <div className="flex my-3 justify-between dark:text-white font-medium">
        <p>{ProductDetails.price} EGY</p>
        <p className=''>
        {ProductDetails.ratingsAverage}  <FaStar className='text-yellow-400 inline-block mb-1'/>
        </p>
      </div>
      
     <div className="flex justify-between">
     <button 
       onClick={()=>addItem(ProductDetails.id)}
       className="w-3/4  text-white  bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
       +Add to Cart
      </button>

      <button 
      onClick={()=>addWishItem(ProductDetails.id)}>
      {wishState?  <FaHeart className='text-xl mt-4 text-red-700'/> : <FaHeart className='text-xl mt-4  dark:text-white hover:text-red-700 transition-all duration-100'/>}
      </button>
     </div>
      
      
    </div>
    
  </div>}
    </>
  )
}
