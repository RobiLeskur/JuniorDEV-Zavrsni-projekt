import ActivitiesCard from './ActivitiesCard';
import Activity from '../../interfaces/ActivityInterface';
import Volunteer from '../../interfaces/VolunteerInterface';
import styles from './activities.module.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import NewActivityPopup from './NewActivityPopup';

function Activities({ deleteActivity, activities,setActivities, fetchData }: {setActivities: Function ,deleteActivity: Function,fetchData: Function ,activities: Activity[]}) {
  const [newActivityPopup, setNewActivityPopup] = useState(false);


  const toggleNewActivityPopup = () => {
    setNewActivityPopup(!newActivityPopup);
};


  return (
    <div className={styles.activitiesContainer}>
      <br />
      <h1>Aktivnosti:</h1><br />
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
        {activities.map((activity: Activity) => (
        <ActivitiesCard key={activity.id} fetchData={fetchData} activity={activity} deleteActivity={deleteActivity}/>
        ))}
      </div>
      <Button variant="success" className={styles.newActivityBtn} onClick={toggleNewActivityPopup}>Nova Aktivnost</Button>
      {newActivityPopup && <NewActivityPopup setActivities={setActivities} toggleNewActivityPopup={toggleNewActivityPopup} />}
    </div>
  );
}

export default Activities;