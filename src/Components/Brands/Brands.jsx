import React, { useContext } from 'react'
import Style from './Brands.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { BrandsContext } from '../../Context/BrandsContext'
import BrandItem from '../BrandItem/BrandItem'
import Loading from '../Loading/Loading'

export default function Brands() {

  const {getAllBrands} = useContext(BrandsContext)
  const [brands, setBrands] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getBrands(){
    setIsLoading(true)
    const response = await getAllBrands();
    console.log(response.data.data)
    setBrands(response.data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getBrands()
  }, [])
    
  return (
    <>
      {isLoading? <Loading />:
      <div>
        <div className="text-green-600 my-3 h2">All Brands</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {
        
        brands?.map(b => <BrandItem brand={b}/>)
         
      }
      </div>
        </div>}
    </>
  )
}
