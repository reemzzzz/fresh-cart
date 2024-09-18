import React from 'react'
import Style from './Allorders.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function Allorders() {

   const [orderDetails, setOrderDetails] = useState(null)

   async function getAllOrders(){
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/')
    // console.log(response.data)
    setOrderDetails(response.data.data)
    console.log(orderDetails)
    
   }
   useEffect(() => {
    getAllOrders()
    console.log(orderDetails)
  }, [])
    
  return (
    <>
      
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Order ID
        </th>
        <th scope="col" className="px-6 py-3">
          Payment Method
        </th>
        <th scope="col" className="px-6 py-3">
          User name
        </th>
        <th scope="col" className="px-6 py-3">
          Order Price
        </th>
        <th scope="col" className="px-6 py-3">
          Order Time
        </th>
        
      </tr>
    </thead>
    <tbody>
      

      {orderDetails && orderDetails.map(o => (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {o.id}
        </th>
        <td className="px-6 py-4">
          {o.paymentMethodType}
        </td>
        <td className="px-6 py-4">
          {o.user.name}
        </td>
        <td className="px-6 py-4">
          {o.totalOrderPrice} EGY
        </td>
        <td className="px-6 py-4">
          {o.createdAt}
        </td>
        
      </tr>)
      )}
      
    </tbody>
  </table>
</div>

    </>
  )
}
