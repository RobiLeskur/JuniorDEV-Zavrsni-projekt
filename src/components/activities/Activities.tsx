import ActivitiesCard from './ActivitiesCard';
import Activity from '../../interfaces/ActivityInterface';
import Volunteer from '../../interfaces/VolunteerInterface';

function Activities({ deleteActivity, activities, fetchData }: { deleteActivity: Function,fetchData: Function ,activities: Activity[]}) {

  return (
    <div>
      <h1>Aktivnosti:</h1><br />
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
        {activities.map((activity: Activity) => (
        <ActivitiesCard key={activity.id} fetchData={fetchData} activity={activity} deleteActivity={deleteActivity}/>
        ))}
      </div>
    </div>
  );
}

export default Activities;