import React from 'react'
import LandingPage from "./fudu/pages/LandingPage";
import { Routes, Route } from 'react-router-dom'
import Login from './fudu/pages/Login'
import Register from './fudu/pages/Register'

import './App.css'
import ProductMenu from './fudu/components/ProductMenu'

const App = () => {
  return (
    <div>
      <Routes>
          <Route path='/' element = { <LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/products/:firmId/:firmName' element = {<ProductMenu />} />
      </Routes>
    
    </div>
  )
}

export default App