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

function App() {
  const [activities, setActivities] = useState([] as Activity[]);
  const [volunteers, setVolunteers] = useState([] as Volunteer[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/volunteers")
      .then(res => {
        setVolunteers(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });

    axios
      .get("http://localhost:3001/activities")
      .then(res => {
        setActivities(res.data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false); // Set loading state to false even if there's an error
      });
  };

  const deleteActivity = (idPodatka: string) => {
    console.log(idPodatka + " is deleted");
    /* 
      axios.delete('http://localhost:3001/activities/' + idPodatka)
        .then(() => {
          fetchData(); // Refresh data after deletion
        })
        .catch(err => {
          console.log(err);
        });
    */
  };

  return (
    <>
      <AdminContextProvider>
        <Router>
          <NavBar />
          <div className="container">

            {isLoading ? (<p>Loading...</p>) : 
            (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/activities"
                  element={<Activities deleteActivity={deleteActivity} fetchData={fetchData} activities={activities} />}
                />
              </Routes>
            )}
          </div>
        </Router>
      </AdminContextProvider>
    </>
  );
}

export default App;