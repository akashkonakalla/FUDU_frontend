import React from 'react'
import LandingPage from "./fudu/pages/LandingPage";
import { Routes, Route } from 'react-router-dom'
import UserLogin from './fudu/pages/UserLogin'
import UserRegister from './fudu/pages/UserRegister'
import UserProfile from './fudu/pages/UserProfile';
import UserEditProfile from './fudu/pages/UserEditProfile';

import './App.css'
import ProductMenu from './fudu/components/ProductMenu'

const App = () => {
  return (
    <div>
      <Routes>
          <Route path='/' element = { <LandingPage />} />
          <Route path='/products/:firmId/:firmName' element = {<ProductMenu />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/edit" element={<UserEditProfile />} />

      </Routes>
    
    </div>
  )
}

export default App