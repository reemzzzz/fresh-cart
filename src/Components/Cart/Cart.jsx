import React, { useContext } from 'react'
import Style from './Cart.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { CartContext } from '../../Context/CartContext'
import { FaTrash } from 'react-icons/fa'
import CartItem from '../CartItem/CartItem'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
// import CheckOut from '../CheckOut/CheckOut'

export default function Cart() {
    const {getUserCart,updateCountOfItem,deleteItem,clearCart} = useContext(CartContext)
    const [cartDetails, setCartDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    async function getLoggedUserCart(){
      setIsLoading(true)
      const response = await getUserCart()
      console.log(response.data.data);  
      if(response.data.status == "success"){

        setCartDetails(response.data.data)
        // console.log(cartDetails._id)
        setIsLoading(false)
        
      }
    }


    async function updateFn(id , count){
      
      const response = await updateCountOfItem(id,count)
      console.log(response.data)
      

      if(response.data.status == "success"){
        setCartDetails(response.data.data)
        toast.success("Updated")
      }
    }

    async function deleteFn(id){
      const response = await deleteItem(id)
      console.log(response.data)

      if(response.data.status == "success"){
        setCartDetails(response.data.data)
        toast.success("Deleted")
      }
    }

    async function clearFn(){
      const response = await clearCart()
      console.log(response.data)

      if(response.data.status == "success"){
        setCartDetails(response.data.data)
        toast.success("Deleted")
      }
    }

    useEffect(() => {
      getLoggedUserCart()
      // console.log(cartDetails)
    }, [])
    

  return (
   <> 
{isLoading?<Loading /> : <div className="relative overflow-x-auto sm:rounded-lg">
  <div className="text-green-600 my-3 h2">Cart Details</div>
  <div className="flex justify-between">
    <p className='h3'>Total Price {cartDetails?.totalCartPrice}</p>
    <button 
    onClick={()=>clearFn}
    className='text-white bg-green-600  rounded-lg p-3 '>
      <p className='inline-block pe-1'>Clear Cart</p> 
      <FaTrash className='text-white inline-block'/>
    </button>
  </div>
  <table className="w-full text-sm text-left shadow-md  rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody className=''>
      {
        // cartDetails.products.map(p => <CartItem />)
        
         cartDetails?.products.map(p => <CartItem deleteFn={deleteFn} updateFn={updateFn } count={p.count} price={p.price} product={p.product} load={isLoading} />)
         
      }
   
    </tbody>
  </table>
  <Link to={'/checkout/' + cartDetails?._id}>
      <button 
      className='disabled:bg-green-300 disabled:text-gray-600 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full my-5 px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800'>
        Checkout Session
      </button>
  </Link>
</div>}
</>

  )
}
