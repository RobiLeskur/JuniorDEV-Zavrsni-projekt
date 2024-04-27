import ActivitiesCard from './ActivitiesCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Activity from '../../interfaces/activityInterface';

function Activities({ deleteActivity, activities }: { deleteActivity: Function, activities: Activity[] }) {

  return (
    <div>
      <h1>Aktivnosti:</h1><br />
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
        {activities.map((activity: Activity) => (
          <ActivitiesCard key={activity.id} id={activity.id} name={activity.name} description={activity.description} date={activity.date} deleteActivity={deleteActivity}/>
        ))}
      </div>
    </div>
  );
}

export default Activities;