import React, { useContext } from 'react'
import Style from './CheckOut.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from 'axios'
import { FaSpinner } from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom"
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'

export default function CheckOut() {

  const [errMsg, setErrMsg] = useState('') 

  const {checkOutSession} = useContext(CartContext)
   const [isLoading, setIsLoading] = useState(false)

    const {cartId} = useParams()
    const formik = useFormik({
      initialValues: {
       
        "details": '',
        "phone": '',
        "city":''
       
      },
      onSubmit:  handleSubmit,
    
    }) 

   async function handleSubmit(values){
     setIsLoading(true)

    try{
      const response = await checkOutSession(cartId,values)
      console.log(response.data.session.url)
      window.location.href = response.data.session.url 
    }catch(err){
      setErrMsg("Failed")
    }finally{
      
      setIsLoading(false)
    }
     
      
   }

   
    
    useEffect(() => {
      
      console.log("Mounting Login")
    }, [])
    
  return (

    <div>
      <div className="h3 fw-light text-green-500">CheckOut</div>
      {errMsg? <>
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{errMsg}</span>
            </div> 
      </div>
      </>:null}
      <form 
      onSubmit={formik.handleSubmit}
      className="mx-auto mt-5" >
       
        <div className="relative z-0 w-full mb-5 group">
          <input 
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="tel" 
          name="phone" 
          id="phone" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          UserPhone</label>

          
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input 
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text" 
          name="city" 
          id="city" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          UserCity</label>

          
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input 
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text" 
          name="details" 
          id="details" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          UserDetails</label>

          
        </div>
        
       
     
        <button 
        disabled={isLoading}
        type="submit" 
        className="disabled:bg-green-300 disabled:text-gray-600 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800">
          {isLoading? <FaSpinner className='animate-spin'/> : "Pay"}
        </button>
      </form>

      </div>


  )
}
