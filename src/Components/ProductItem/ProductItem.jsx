import React from 'react'
import Style from './ProductItem.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ProductDetails from '../ProductDetails/ProductDetails'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { CiHeart } from "react-icons/ci";
import { WishListContext } from '../../Context/WishListContext'
import { UserContext } from '../../Context/UserContext'

export default function ProductItem({products}) {

    //const [isWishListed, setIsWishListed] = useState(false)
    const {setCartItems,addItemToCart} = useContext(CartContext)
    const {setWishListed,addItemToWishList,wishListed} = useContext(WishListContext)
    const {token} =   useContext(UserContext)

    
    
    
    async function addItem(id){
      try{
        const response = await addItemToCart(id)
        console.log(response.message)
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
      catch(err){
        console.log(err)
      }
     
    }
    
    const [wishState, setWishState] = useState(localStorage.getItem(`${token}_${products._id}`))
    useEffect(()=>{
      if(wishState === true){
        setWishState(true)
      }
    },[products._id]);



   


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

    
  return (
   <div className='group hover:shadow-lg p-6 rounded-lg transition-all duration-500'>
     <Link to={`/productDetails/${products._id}`}>
        <div className="w-full" key={products._id}>
      
      <img
      className='' 
      src={products.imageCover}
       alt="" />
       <p className='line-clamp-3 dark:text-white'>{products.category.name}</p>

      <h3 className='h3 font-semibold text-green-500'>{products.title.split(' ').slice(0,2).join(' ')}</h3>
      
      <div className="flex justify-between dark:text-white font-medium">
        <p>{products.price} EGY</p>
        <p className=''>
        {products.ratingsAverage}  <FaStar className='text-yellow-400 inline-block mb-1'/>
        </p>
      </div>

     
    </div>
    </Link>
    <div className="flex justify-between">
    <button 
     onClick={() => addItem(products._id)}
     className="w-full my-3 transition-all duration-500 text-white opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
     Add to Cart
    </button>
    <button onClick={()=>addWishItem(products._id)}>
    
    {wishState?  <FaHeart className='text-xl mt-4 text-red-700'/> : <FaHeart className='text-xl mt-4  dark:text-white hover:text-red-700 transition-all duration-100'/>}
    </button>
    
    </div>
     
   </div>

  )
}
