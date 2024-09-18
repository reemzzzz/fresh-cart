import React from 'react'
import Style from './LayOut.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function LayOut() {

    const [counter, setCounter] = useState(0)
    useEffect(() => {
      
      console.log("Mounting LayOut")
    }, [])
    
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 max-w-screen-xl">
          <Outlet />
      </div>
    </>
  )
}
