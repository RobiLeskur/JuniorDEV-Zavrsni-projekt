import './App.css';
import React, { createContext, useContext, useState } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Activities from './components/activities/Activities';
import { AdminContextProvider } from './components/AdminContext';



function App() {

  

  return (
    <>
   <AdminContextProvider>
        <Router>
          <NavBar />

          <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
          </Routes>
          </div>
        </Router>
    </AdminContextProvider>
    </>
  )
}

export default App
