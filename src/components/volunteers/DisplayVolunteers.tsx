import React from 'react';
import Volunteer from '../../interfaces/VolunteerInterface';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './volunteers.module.css';
import { useAdmin } from '../NavBarAndAdminComands/AdminContext';


function DisplayVolunteers({ volunteers, deleteVolunteer, editVolunteer }: { volunteers: Volunteer[], deleteVolunteer: Function, editVolunteer: Function }) {
    const { isAdmin, toggleAdmin } = useAdmin();




    return (
        <div className={styles.displayVolunteersContainer}>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {volunteers.map((volunteer) => (
                    <div className='col' style={volunteers.length === 1 ? { width: '100%' } : {}} key={volunteer.id}>
                        <Card className={styles.card}>
                            <Card.Body style={{paddingBottom: '0'}}>
                                <Card.Title>{volunteer.first_name} {volunteer.last_name}</Card.Title>
                                <hr />
                                <Card.Text>
                                    Grad: {volunteer.city} <br />
                                    Spol: {volunteer.gender === "male" ? 'Muško' : 'Žensko'} <br />
                                    Aktivnosti: {volunteer.preferences.join(', ')}
                                </Card.Text>
                                {
                                    isAdmin &&
                                    <div style={{float: 'right'}}>
                                    
                                        <Button style={{ opacity: '0.7' }} onClick={() => editVolunteer(volunteer)} variant="warning">Edit</Button>
                                        <Button style={{ opacity: '0.8' }} onClick={() => deleteVolunteer(volunteer.id)} variant="danger">🗑</Button>
                                    </div>}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default DisplayVolunteers;