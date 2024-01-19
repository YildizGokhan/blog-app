import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from "../pages/Login"
import Register from '../pages/Register'
import Navbar from '../components/Navbar'


const AppRouter = () => {
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default AppRouter