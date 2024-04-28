import './App.css';
import React, { createContext, useContext, useState, useEffect } from 'react';
import NavBar from './components/NavBarAndAdminComands/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Activities from './components/activities/Activities';
import { AdminContextProvider } from './components/NavBarAndAdminComands/AdminContext';
import axios from 'axios';
import Activity from './interfaces/ActivityInterface';
import Volunteer from './interfaces/VolunteerInterface';


//Open database with json-server:
//json-server --watch database.json --port 3001

function App() {

  const [activities, setActivities] = useState([] as Activity[]);
  const [volunteers, setVolunteers] = useState([] as Volunteer[]);

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data
  const fetchData = () => {
    axios
      .get("http://localhost:3001/volunteers")
      .then(res => {
        setVolunteers(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get("http://localhost:3001/activities")
      .then(res => {
        setActivities(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  
  const deleteActivity = (idPodatka: string) => console.log(idPodatka + " is deleted");/* {
     axios.delete('http://localhost:3001/activities/' + idPodatka)
       .then(() => {
         fetchData(); // Refresh data after deletion
       }
    );  

    console.log(idPodatka + " is deleted");
  }   */


  return (
    <>
       <AdminContextProvider>
        <Router>
          <NavBar />

          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/activities" element={<Activities deleteActivity={deleteActivity} activities={activities}/>} />
            </Routes>
          </div>
        </Router>
      </AdminContextProvider>
    </>
  )
}

export default App
