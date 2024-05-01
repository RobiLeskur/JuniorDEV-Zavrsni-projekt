import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Activity from '../../interfaces/ActivityInterface';
import Volunteer from '../../interfaces/VolunteerInterface';
import Organization from '../../interfaces/OrganizationInterface';
import styles from './activities.module.css';
import AddVolunteerToActivityForm from './AddVolunteerToActivityForm';

import { Button, ButtonGroup, CloseButton } from 'react-bootstrap';

function ActivitiesCardPopup({ togglePopup, activity, fetchData }: { togglePopup: any, activity: Activity, fetchData: Function }) {
    const [volunteers, setVolunteers] = useState([] as Volunteer[]);
    const [organizations, setOrganizations] = useState([] as Organization[]);
    const [selectedVolunteerId, setSelectedVolunteerId] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get("http://localhost:3001/volunteers")
            .then(res => setVolunteers(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3001/organizations")
            .then(res => setOrganizations(res.data))
            .catch(err => console.log(err));
    }, []);

    const getOrganizationById = (organizationId: string) => {
        return organizations.find(organization => organization.id === organizationId);
    };

    const getVolunteerById = (volunteerId: string) => {
        return volunteers.find(volunteer => volunteer.id === volunteerId);
    };

    const removeVolunteerFromActivity = (volunteerId: string) => {
        const updatedVolunteers = activity.volunteers.filter(id => id !== volunteerId);
        const updatedActivity = { ...activity, volunteers: updatedVolunteers };
        axios.put(`http://localhost:3001/activities/${activity.id}`, updatedActivity)
            .then(() => {
                fetchData();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const confirmDeleteVolunteer = (volunteerId: string) => {
        setSelectedVolunteerId(volunteerId);
    };

    const cancelDeleteVolunteer = () => {
        setSelectedVolunteerId(null);
    };

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <CloseButton style={{ position: 'absolute', top: '0.2rem', right: '0.2rem', padding: '0.3em' }} onClick={togglePopup} />
                <h2>{activity.name}</h2>
                <p><b>Opis:</b> {activity.description}</p>
                <p><b>Lokacija:</b> {activity.location}</p>
                <p><b>Organizacija: </b>{organizations && getOrganizationById(activity.organization)?.name}</p>
                <AddVolunteerToActivityForm />
                <hr />
                <p style={{ marginBottom: "0" }}><b>Volonteri:</b></p>
                <div className={`${styles.lg} ${styles.scrollableDiv}`}>
                    {activity.volunteers && activity.volunteers.map(volunteerId => {
                        const volunteer = getVolunteerById(volunteerId);
                        return (
                            volunteer &&
                            <div key={volunteer.id} className={styles.volunteerItem}>
                                <p style={{ marginBottom: "0" }}>ID: {volunteer.id} - {volunteer.first_name} {volunteer.last_name}</p>
                                <Button onClick={() => confirmDeleteVolunteer(volunteer.id)} variant="outline-danger">Delete</Button>{' '}
                            </div>
                        );
                    })}
                </div>
                {selectedVolunteerId && (
                    <div className={styles.confirmationPopup}>
                        <hr />
                        <p>Jeste li sigurni da želite maknuti volontera pod imenom {getVolunteerById(selectedVolunteerId)?.first_name} {getVolunteerById(selectedVolunteerId)?.last_name} s popisa?</p>
                        <ButtonGroup aria-label="Basic example">
                            <Button onClick={() => removeVolunteerFromActivity(selectedVolunteerId)} variant="danger">Yes</Button>
                            <Button onClick={cancelDeleteVolunteer} variant="outline-success">No</Button>
                        </ButtonGroup>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ActivitiesCardPopup;