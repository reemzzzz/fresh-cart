import React from 'react'
import Style from './MainSlider.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import img1 from '../../assets/imgs/main-slider-1.jpeg'
import img2 from '../../assets/imgs/main-slider-2.jpeg'
import img3 from '../../assets/imgs/main-slider-3.jpeg'
import img4 from '../../assets/imgs/slide-1.jpeg'
import img5 from '../../assets/imgs/slide-2.jpeg'
import Slider from 'react-slick'


export default function MainSlider() {

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    const [counter, setCounter] = useState(0)
    useEffect(() => {
      
      console.log("Mounting MainSlider")
    }, [])
    
  return (
    <div>
      <div className="grid md:grid-cols-12">
        <div className="col-span-8 py-2 ">
        <Slider {...settings}>
          <img src={img1} alt=""  className='h-[400px] w-full'/>
          <img src={img4} alt=""  className='h-[400px] w-full'/>
          <img src={img5} alt=""  className='h-[400px] w-full'/>
          </Slider>
        </div>
        <div className="col-span-4 py-2 ">
          <img src={img2} className='h-[200px] w-full' alt="" />
          <img src={img3} className='h-[200px] w-full' alt="" />
        </div>
      </div>
    </div>
  )
}
