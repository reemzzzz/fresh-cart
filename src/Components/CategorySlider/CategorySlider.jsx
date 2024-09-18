import React from 'react'
import Style from './CategorySlider.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import axios from 'axios';
axios

export default function CategorySlider() {
 const [categories, setCategories] = useState([])

    
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };


    async function getCategories(){
      const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategories(data?.data)
    }

   

    const [counter, setCounter] = useState(0)
    useEffect(() => {
      
      console.log("Mounting CategorySlider")
      getCategories()
    }, [])

    if(categories.length === 0){
      <Loading />
    }
    
  return (
    
      <Slider {...settings} className='my-10'>
        {/* <div className="h3">heyy</div> */}
        {
          
          categories.map((c)=> <div key={c._id} className='px-2'>
            <div className="text-center dark:text-white text-green-500 relative">
            <img className='h-[200px] w-full object-cover' src={c.image} alt="" />
            <h3 className='font-semibold py-2 '>{c.name}</h3>
            <div className="overlay absolute bg-gray-800 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500">
            
            </div>
            </div>

          </div>)
        }
      </Slider>
    
  )
}
