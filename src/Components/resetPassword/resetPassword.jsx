import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { UserContext } from '../../Context/UserContext';


export default function ResetPassword() {
  const {setToken} = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 
  async function changePassword() {
    setIsLoading(true); 
   

    try {
      const response = await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword', 
        {
          email, 
          newPassword: password
        }
      );

      setToken(response.data.token)
      navigate('/')
      toast.success("Your password was changed successfully", {
        style: { backgroundColor: "green", color: "white" },
        position: "top-right"
      });
    } catch (error) {
      setErrMsg(error.response?.data?.message || 'Failed to change your password');
      toast.error(errMsg, {
        style: { backgroundColor: "red", color: "white" },
        position: "top-right"
      });
    } finally {
      setIsLoading(false); 
    }
  }

  return (
    <>
      <h1 className='text-green-600 text-xl my-4'>Reset your account password:</h1>

      <div className="relative z-0 w-full mb-5 group">
        <input 
          type="email" 
          name="email" 
          id="email" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          UserEmail
        </label>

      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input 
          type="password" 
          name="newPassword" 
          id="newPassword" 
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          New Password
        </label>
      </div>

      
      
      {errMsg && <p className="text-red-500 mt-2">{errMsg}</p>}

      <button 
        onClick={changePassword} 
        type="submit" 
        className={`my-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 ${isLoading && 'disabled:bg-green-300 disabled:text-gray-600'}`}
        disabled={isLoading}
      >
        {isLoading ? <FaSpinner className='animate-spin'/> : 'Reset Password'}
      </button>
    </>
  );
}
