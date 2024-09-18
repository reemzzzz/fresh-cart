import React from 'react'
import Style from './Home.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import RecentProducts from '../RecentProducts/RecentProducts'
import Loading from '../Loading/Loading'


export default function Home() {

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
   async function getProducts(){
    setIsLoading(true)
    
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    console.log(data.data)  
    setData(data.data)

    setIsLoading(false)
    
  }
    useEffect(() => {getProducts()}, []) //on mounting
    
  return (
    <>{isLoading? <Loading />:
      <div>
        <MainSlider />
      <CategorySlider />
      <RecentProducts/>
      </div>
    }
     
    </>
  )
}
