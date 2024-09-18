import React from 'react'
import Style from './BrandItem.module.css'
import { useState } from 'react'
import { useEffect } from 'react'

export default function BrandItem({brand}) {

  return (
   <>
      
<div className="block  text-center align-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg  shadow-md hover:shadow-xl transition-all duration-150 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<img src={brand?.image} className="w-16 md:w-32 max-w-full max-h-full m-auto" alt={brand?.name}   />
<h2
className='font-semibold '
>{brand?.name}</h2>
</div>

   </>
  )
}
