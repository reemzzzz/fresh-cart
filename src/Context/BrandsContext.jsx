import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const BrandsContext = createContext();


export default function BrandsContextProvider({children}){


    function getAllBrands(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
          .then(data => data)
          .catch(err => err)
     }


    return <BrandsContext.Provider value={ {getAllBrands} }>
            {children}
    </BrandsContext.Provider>

}