import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import axios from 'axios';
import Activity from '../../interfaces/ActivityInterface';
import Volunteer from '../../interfaces/VolunteerInterface';

function ActivitiesCardPopup({ togglePopup, activity, fetchData }: { togglePopup: any, activity: Activity, fetchData: Function }) {

    // Function to remove a volunteer from the activity
    const removeVolunteer = (volunteerId: string) => {
        axios.delete(`http://localhost:3001/activities/${activity.id}/volunteers/${volunteerId}`)
            .then(() => {
                // Refresh data after removal
                fetchData();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <CloseButton style={{ position: 'absolute', top: '0.2rem', right: '0.2rem', padding: '0.3em' }} onClick={togglePopup} />
                <h2>{activity.name}</h2>
                <p>Opis: {activity.description}</p>
                <p>Lokacija: {activity.location}</p>
                <p>Organizacija: {activity.organization}</p>
                <p>Volonteri:</p>
                {activity.volunteers.map(volunteer => (
                    <div key={volunteer.id}>
                        <p>{volunteer.id}: {volunteer.first_name} {volunteer.last_name}</p>
                        <button onClick={() => removeVolunteer(volunteer.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActivitiesCardPopup;