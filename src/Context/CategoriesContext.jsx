import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const CategoriesContext = createContext();


export default function CategoriesContextProvider({children}){


    function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
          .then(data => data)
          .catch(err => err)
     }


    return <CategoriesContext.Provider value={ {getAllCategories} }>
            {children}
    </CategoriesContext.Provider>

}