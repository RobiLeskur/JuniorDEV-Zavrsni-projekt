import './App.css';
import React, { createContext, useContext, useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Activities from './components/activities/Activities';
import { AdminContextProvider } from './components/AdminContext';
import axios from 'axios';
import Activity from './interfaces/activityInterface';


function App() {

  const [activities, setActivities] = useState([] as Activity[]);
  
 
    useEffect(() => {
      axios
        .get("http://localhost:3001/activities/")
        .then(res => setActivities(res.data));
    }, []);

    function refreshData(){
    axios
        .get("http://localhost:3001/activities/")
        .then(res => setActivities(res.data));
  }
 refreshData()

  function deleteActivity(idPodatka : number) {
    axios.delete('http://localhost:3001/activities/' + idPodatka)
      .then(() => {
        refreshData();
      }
      )
  }


  return (
    <>
      <AdminContextProvider>
        <Router>
          <NavBar />

          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/activities" element={<Activities deleteActivity={deleteActivity} activities={activities}  />} />
            </Routes>
          </div>
        </Router>
      </AdminContextProvider>
    </>
  )
}

export default App
