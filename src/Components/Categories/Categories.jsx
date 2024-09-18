import React, { useContext } from 'react'
import Style from './Categories.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../Loading/Loading'
import { CategoriesContext } from '../../Context/CategoriesContext'

import axios from 'axios'
axios


export default function Categories() {

  const {getAllCategories} = useContext(CategoriesContext)
  const [categories, setCategories] = useState(null)
  const [subcategories, setSubcategories] = useState(null)
  const [activeCategoryName, setActiveCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false)


  async function getCategories(){
    setIsLoading(true)

    const response = await getAllCategories();
    // console.log(response.data.data)
    setCategories(response.data.data)
    setIsLoading(false)
  }

  async function getSubCategories(id,name){
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    setSubcategories(response.data.data)
    setActiveCategoryName(name);
    // console.log(response.data.data)
    console.log(subcategories)
  
   }

  useEffect(() => {
    getCategories()
  }, [])
    
  return (
    <>
      {isLoading? <Loading /> :
      <div>
      <div className="text-green-600 my-3 h2">All Categories</div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories?.map(category => (
          <div key={category._id} className="space-y-3">
            <div
              onClick={() => getSubCategories(category._id,category.name)}
              className="hover:shadow-lg hover:shadow-slate-600 transition-all duration-500 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer h-full"
            >
              <img className="rounded-t-lg w-full h-3/4" src={category.image} alt={category.name} />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{category.name}</h5>
              </div>
            </div>

           
           
          </div>
        ))}
       
     

      </div>
      <div className="">
       
      {subcategories && (
        <div className="ml-5 mt-3">
          <h6 className="text-2xl font-semibold text-green-600 text-center py-7">{activeCategoryName} Subcategories:</h6>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {subcategories.map(subcategory => (
              
              <h2
              className='font-semibold text-center align-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg  shadow-md hover:shadow-xl transition-all duration-150 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
              >{subcategory?.name}</h2>
            ))}
          </div>
        </div>
      )}
      </div>
      </div>
      }
      
      
    </>
  )
}
