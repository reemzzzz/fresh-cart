import React from 'react'
import Style from './VerifyCode.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'
FaSpinner


export default function VerifyCode() {

  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState(null)
  const [errMsg, setErrMsg] = useState(null)
  const navigate = useNavigate()


  async function verifyUserCode() {
    setIsLoading(true); 
   try{
    const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      {resetCode: code}
    )
    navigate('/reset-password')
    toast.success("Code verified", {
      style: {
        backgroundColor: "green", 
        color: "white"
      },
      position: "top-right"
    });

   }
   catch (error) {
    setErrMsg('Wrong verification code');
    toast.error("Wrong verification code", {
      style: {
        backgroundColor: "red",
        color: "white"
      },
      position: "top-right"
    });
  } finally {
    setIsLoading(false);
  }
  }
    
    
  return (
    <>
      <h1 className='text-green-600 text-xl my-4'>Please write the verification code:</h1>
      <div className="relative z-0 w-full mb-5 group">
        <input 
          type="text" 
          name="code" 
          id="code" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          required
        />
        <label htmlFor="code" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Enter code
        </label>

        {errMsg && <p className="text-red-500 mt-2">{errMsg}</p>} 

        <button 
          onClick={verifyUserCode} 
          type="submit" 
          className={`my-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800
             ${isLoading && 'disabled:bg-green-300 disabled:text-gray-600'}`}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className='animate-spin'/> : 'Verify'}
        </button>
      </div>
    </>
  )
}
