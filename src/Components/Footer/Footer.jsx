import React from 'react'
import Style from './Footer.module.css'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Footer() {

    const [counter, setCounter] = useState(0)
    useEffect(() => {
      
      console.log("Mounting Footer")
    }, [])
    
  return (
    <div>
      <h2>Footer</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque accusamus illum beatae, ex nihil cupiditate.</p>
    </div>
  )
}
