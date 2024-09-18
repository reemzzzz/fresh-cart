import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const CartContext = createContext();


export default function CartContextProvider({children}){

    const token = localStorage.getItem('token');
    const headers = {
        token
    }

    function getUserCart(){
       return axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {
            headers
        })
         .then(data => data)
         .catch(err => err)
    }
    function addItemToCart(pId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
           { productId: pId}
         , {
             headers
         })
          .then(data => data)
          .catch(err => err)
     }

     function updateCountOfItem(id , count){
        return axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + id,
           { count: count}
         , {
             headers
         })
          .then(data => data)
          .catch(err => err)
     }
     function deleteItem(id){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + id
         , {
             headers
         })
          .then(data => data)
          .catch(err => err)
     }

     function clearCart(){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart'
         , {
             headers
         })
          .then(data => data)
          .catch(err => err)
     }

     function checkOutSession(cartId , shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`

      ,{"shippingAddress": shippingAddress}
      ,{
        headers
      })
      .then(data => data)
      .catch(err => err)
      
     }

     const [cartItems,  setCartItems] = useState(0)

     
     async function getCart(){
        const response = await getUserCart(); 
        if(response.data.status == "success"){
             setCartItems(response.data.numOfCartItems);
             console.log({cartItems});
             
        }
     }


     useEffect(()=>{
        getCart()
     },[])

    return <CartContext.Provider value={ 
        {setCartItems
        ,cartItems
        ,getUserCart 
        , addItemToCart 
        , updateCountOfItem 
        , deleteItem 
        , checkOutSession
        ,clearCart} }>
            {children}
    </CartContext.Provider>
}