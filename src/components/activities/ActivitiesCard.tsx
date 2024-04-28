import Card from 'react-bootstrap/Card';
import { useAdmin } from '../NavBarAndAdminComands/AdminContext';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import ActivitiesCardPopup from './ActivitiesCardPopup';
import Activity from '../../interfaces/ActivityInterface';
import Volunteer from '../../interfaces/VolunteerInterface';
import styles from './activities.module.css';




function ActivitiesCard({activity, deleteActivity, fetchData}: { activity: Activity, deleteActivity: Function, fetchData: Function } ){

    const { isAdmin, toggleAdmin } = useAdmin();
    const [showPopup, setShowPopup] = useState(false);
   

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

   
      

    return (
        <>
            <Card border="dark" className={styles.activitiesCard} style={{ width: '18rem', margin: '0.5rem', zIndex: '1' }} >
                <Card.Header onClick={togglePopup}>{activity.date}</Card.Header>
                <Card.Body onClick={togglePopup} style={{ height: '8rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <Card.Title >{activity.name}</Card.Title>
                    <Card.Text style={{ height: '4rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activity.description}</Card.Text>
                    
                </Card.Body>
                {
                        isAdmin &&
                        <Button style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', opacity: '0.8' }} onClick={() => deleteActivity(activity.id)} variant="danger" >🗑</Button>
                    }
            </Card>

           
            {showPopup && <ActivitiesCardPopup fetchData={fetchData} togglePopup={togglePopup} activity={activity} />}
        </>
    );
}

export default ActivitiesCard;