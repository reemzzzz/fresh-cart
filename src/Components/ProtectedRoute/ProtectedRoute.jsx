import React, { useContext } from 'react'
import Style from './ProtectedRoute.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {


    const {token} = useContext(UserContext)

    if(token){
      //login
      return props.children
    }else{
      // you didn't login
      return <Navigate to={'/login'}></Navigate>
    }
    const [counter, setCounter] = useState(0)
    useEffect(() => {
      
      console.log("Mounting ProtectedRoute")
    }, [])
    
  return (
    <div>
      <h2>ProtectedRoute</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque accusamus illum beatae, ex nihil cupiditate.</p>
    </div>
  )
}
