import React from 'react';
import Volunteer from '../../interfaces/VolunteerInterface';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './volunteers.module.css';
import { useAdmin } from '../NavBarAndAdminComands/AdminContext';


function DisplayVolunteers({ volunteers, deleteVolunteer }: { volunteers: Volunteer[], deleteVolunteer: Function }) {
    const { isAdmin, toggleAdmin } = useAdmin();




    return (
        <div className={styles.displayVolunteersContainer}>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {volunteers.map((volunteer) => (
                    <div className="col" key={volunteer.id}>
                        <Card style={{ marginBottom: '1rem' , height: '100%', overflow: 'hidden', position: 'relative' }}>
                            <Card.Body>
                                <Card.Title>{volunteer.first_name} {volunteer.last_name}</Card.Title>
                                <hr />
                                <Card.Text>
                                    Grad: {volunteer.city} <br />
                                    Spol: {volunteer.gender === "male" ? 'Muško' : 'Žensko'} <br />
                                    Aktivnosti: {volunteer.preferences.join(', ')}
                                </Card.Text>
                                {
                                    isAdmin &&
                                    <Button style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', opacity: '0.8' }} onClick={() => deleteVolunteer(volunteer.id)} variant="danger">🗑</Button>
                                }
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default DisplayVolunteers;