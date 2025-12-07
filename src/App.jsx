import React from 'react'
import LandingPage from "./fudu/pages/LandingPage";
import { Routes, Route } from 'react-router-dom'
import UserLogin from './fudu/pages/UserLogin'
import UserRegister from './fudu/pages/UserRegister'
import UserProfile from './fudu/pages/UserProfile';
import UserEditProfile from './fudu/pages/UserEditProfile';
import ProductMenu from './fudu/components/ProductMenu'

import { CartProvider } from './context/CartContext';
import CartPage from './fudu/pages/CartPage';   // ⬅️ CREATE THIS PAGE

import './App.css'

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/products/:firmId/:firmName' element={<ProductMenu />} />

        {/* User Auth */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/edit" element={<UserEditProfile />} />

        {/* CART PAGE — required for cart icon */}
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </CartProvider>
  )
}

export default App
