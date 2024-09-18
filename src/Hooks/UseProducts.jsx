
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


export default function UseProducts() {
    const response= useQuery({
        queryKey: ['products'],
        queryFn:() => axios.get('https://ecommerce.routemisr.com/api/v1/products'),
        select: (data) => data.data.data,
        staleTime: 10*1000
      })
  return response
}
