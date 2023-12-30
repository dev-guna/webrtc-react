import React from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import { Route, BrowserRouter , Routes, Outlet } from 'react-router-dom';

import Admin from '../components/Admin';
import Users from '../components/Users';
import Home from  '../components/Home';


function Base() {
  return (
    <>
    <BrowserRouter> 
    <Header />
    <Sidebar />
    <Routes>
          <Route exact path='*' element={<Home />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/users' element={<Users />} />
        </Routes>
        <Outlet />
  </BrowserRouter>
    </>
  )
}

export default Base