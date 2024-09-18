import React from 'react'
import Style from './TemplateName.module.css'
import { useState } from 'react'
import { useEffect } from 'react'

export default function TemplateName() {

    const [counter, setCounter] = useState(0)
    useEffect(() => {
      
      console.log("Mounting TemplateName")
    }, [])
    
  return (
    <div>
      <h2>TemplateName</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque accusamus illum beatae, ex nihil cupiditate.</p>
    </div>
  )
}
