import './App.css';
import React, { createContext, useContext, useState } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Activities from './components/Activities';
import AdminContext from './components/AdminContext';



function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState('Admin');

  const toggleRole = () => {
    setIsAdmin(!isAdmin);
  };


  return (
    <>
   <AdminContext.Provider value={{ isAdmin, toggleRole }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
          </Routes>
        </Router>
    </AdminContext.Provider>
    </>
  )
}

export default App
