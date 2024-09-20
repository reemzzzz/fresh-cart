import React from 'react'
import './App.css'
import Home from './Components/Home/Home.jsx'
import {createBrowserRouter , RouterProvider } from "react-router-dom"
import Products from './Components/Products/Products.jsx';
import About from './Components/About/About.jsx';
import Brands from './Components/Brands/Brands.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Categories from './Components/Categories/Categories.jsx';
import Login from './Components/Login/Login.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Register from './Components/Register/Register.jsx';
import LayOut from './Components/LayOut/LayOut.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import CounterContextProvider from './Context/counterContext.jsx';
import UserContextProvider, { UserContext } from './Context/UserContext.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import toast, { Toaster } from 'react-hot-toast';
CategoriesContextProvider

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import CartContextProvider from './Context/CartContext.jsx';
import CheckOut from './Components/CheckOut/CheckOut.jsx';
import Allorders from './Components/Allorders/Allorders.jsx';
import WishList from './Components/WishList/WishList.jsx';
import WishListContextProvider from './Context/WishListContext.jsx';
import BrandsContextProvider, { BrandsContext } from './Context/BrandsContext.jsx';
import CategoriesContextProvider from './Context/CategoriesContext.jsx';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.jsx';
import VerifyCode from './Components/VerifyCode/VerifyCode.jsx';
import ResetPassword from './Components/resetPassword/resetPassword.jsx';





const route =  createBrowserRouter([
  {path: "/e-commerce/", element: <LayOut /> , children: [
    {path: "products" , element: <ProtectedRoute><Products /></ProtectedRoute>},
    {index: true , element: <ProtectedRoute><Home /></ProtectedRoute>},
    {path: "about" , element: <ProtectedRoute><About /></ProtectedRoute>},
    {path: "brands" , element: <ProtectedRoute><Brands /></ProtectedRoute>},
    {path: "checkout/:cartId" , element: <ProtectedRoute><CheckOut /></ProtectedRoute>},
    {path: "allorders" , element: <ProtectedRoute><Allorders /></ProtectedRoute>},
    {path: "wishlist" , element: <ProtectedRoute><WishList /></ProtectedRoute>},
    {path: "cart" , element: <ProtectedRoute><Cart /></ProtectedRoute>},
    {path: "productDetails/:id" , element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
    {path: "categories" , element: <ProtectedRoute><Categories /></ProtectedRoute>},
    {path: "/e-commerce/login" , element: <Login />},
    {path: "forgot-password" , element: <ForgotPassword />},
    {path: "verify-code" , element: <VerifyCode />},
    {path: "reset-password" , element: <ResetPassword />},
    {path: "register" , element: <Register />},
    {path: "*" , element: <NotFound />},
  ]}
]);

const myClient = new QueryClient({
  defaultOptions : {
    queries: {
      staleTime: 10*1000
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={myClient}>
      <UserContextProvider>'
      <WishListContextProvider>
        <CategoriesContextProvider>
      <BrandsContextProvider>
      <CartContextProvider>
      <CounterContextProvider>
      <RouterProvider router={route}></RouterProvider>
      </CounterContextProvider>
      </CartContextProvider>
      </BrandsContextProvider>
      </CategoriesContextProvider>
      </WishListContextProvider>
      </UserContextProvider>
      <Toaster defaultOptions={
        {
          style: {
            backgroundColor: "green" , color: "white"
          },
          position: "top-right"
        }
      } />
      <ReactQueryDevtools />
    </QueryClientProvider>
   
  )
}
