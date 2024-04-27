import { Link } from 'react-router-dom';
import ActivitiesCard from './ActivitiesCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Activity {
  id: number;
  name: string;
  description: string;
  date: string;
}

function Activities() {
  const [activities, setActivities] = useState([] as Activity[]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/activities/")
      .then(res => setActivities(res.data));
  }, []);

  return (
    <div>
      <h1>Aktivnosti:</h1><br />
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
      {activities.map(activity => (
          <ActivitiesCard name={activity.name} description={activity.description} date={activity.date}/>
      ))}
      </div>
    </div>
  );
}

export default Activities;