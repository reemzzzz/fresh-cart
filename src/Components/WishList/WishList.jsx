import React, { useContext } from 'react'
import Style from './WishList.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import {WishListContext} from '../../Context/WishListContext'
import { FaTrash } from 'react-icons/fa'
import toast from 'react-hot-toast'
import WishListItem from '../WishListItem/WishListItem'
import Loading from '../Loading/Loading'

export default function WishList() {

  const { addItemToWishList , getUserWishList , deleteItemFromWishList } = useContext(WishListContext);
  const [wishListDetails, setWishListDetails] = useState(null)

const [isLoading, setIsLoading] = useState(false)
  async function getFn(){
    setIsLoading(true)
    const response = await getUserWishList()
    console.log(response.data)
    if(response.data.status == "success"){
      setWishListDetails(response.data.data)


    }
    setIsLoading(false)
  }


  async function deleteFn(id){
    
   
    
    try {
      const response = await deleteItemFromWishList(id)
  
      if (response.data.status === "success") {
        const remainingProductIds = response.data.data;
  
        const updatedWishlist = wishListDetails.filter(product => 
          remainingProductIds.includes(product._id)
        );
  
        setWishListDetails(updatedWishlist);
  
        toast.success("Item removed from wishlist", {
          style: { backgroundColor: "green", color: "white" },
          position: "top-right"
        });
      }
    } catch (error) {
      toast.error("Failed to remove item", {
        style: { backgroundColor: "red", color: "white" },
        position: "top-right"
      });
    }
  
      console.log(wishListDetails)
      
    
  }




 

    useEffect(()=>{
      getFn()
   },[])
    
    
  return (
    <>
   {
    isLoading? <Loading />:
    <div className="relative overflow-x-auto sm:rounded-lg">
    <div className="flex justify-between">
      
      <button className='text-white bg-green-600  rounded-lg p-3 '>
        <p className='inline-block pe-1'>Clear WishList</p> 
        <FaTrash className='text-white inline-block'/>
      </button>
    </div>
    <table className="w-full text-sm text-left shadow-md  rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
      <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <div className="text-green-600 my-3 h2">My WishList</div>
      </thead>
      <tbody className='my-2 '>
        {
          wishListDetails?.map(p => <WishListItem product={p} deleteFn={deleteFn} setWishListDetails={setWishListDetails} wishListDetails={wishListDetails} />)
           
        }
     
      </tbody>
    </table>
    
  </div>
   }
    </>
  )
}
