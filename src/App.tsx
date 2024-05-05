import './App.css';
import {useState, useEffect } from 'react';
import NavBar from './components/NavBarAndAdminComands/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import ActivitiesPage from './components/activities/ActivitiesPage';
import VolunteersPage from './components/volunteers/VolunteersPage';
import {  } from './components/NavBarAndAdminComands/AdminContext';
import axios from 'axios';
import Activity from './interfaces/ActivityInterface';
import Volunteer from './interfaces/VolunteerInterface';
import {AdminContextProvider} from './components/NavBarAndAdminComands/AdminContext';
import OrganizationsPage from './components/organizations/OrganizationsPage';



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
        setIsLoading(false);
      });
  };

  const deleteActivity = (activityId: String) => {
    axios
        .delete('http://localhost:3001/activities/' + activityId)
        .then(() => {
            setActivities(prevActivities => prevActivities.filter(activity => activity.id !== activityId));
        })
        .catch(err => {
            console.log(err);
        });
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
                  element={<ActivitiesPage deleteActivity={deleteActivity} setActivities={setActivities} fetchData={fetchData} activities={activities} />}
                />
                <Route
                  path="/volunteers"
                  element={<VolunteersPage activities={activities} />}
                />
                <Route
                path="/organizations"
                element={<OrganizationsPage activities={activities} />}
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