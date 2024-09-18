import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {

    const token = localStorage.getItem('token');
    const headers = {
        token
    };

    
  const [wishListDetails, setWishListDetails] = useState(null)

    const [wishListed, setWishListed] = useState(null);

    function addItemToWishList(pId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId: pId },
            {
                headers
            }
        )
        
        .then(data => data)
        .catch(err => err);
    }


    function getUserWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                headers
            }
        )
        .then(data => data)
        .catch(err => err);
    }

    async function getWishList(){
        const response = await getUserWishList(); 
        if(response.data.status == "success"){
            setWishListed(response.data);
             console.log({wishListed});
             
        }
     }

     function deleteItemFromWishList(id){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + id
         , {
             headers
         })
          .then(data => data)
          .catch(err => err)
     }


     

     useEffect(()=>{
        getWishList()
     },[])

    return (
        <WishListContext.Provider value={{ 
            addItemToWishList,
            getUserWishList,
            getWishList,
            wishListed,
            setWishListed,
            deleteItemFromWishList,
            setWishListDetails,
            wishListDetails
         }}>
            {children} 
        </WishListContext.Provider>
    );
}
