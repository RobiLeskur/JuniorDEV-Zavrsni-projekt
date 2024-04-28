import React, {useState, useEffect} from 'react';
import { CloseButton } from 'react-bootstrap';
import styles from './activities.module.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Organization from '../../interfaces/OrganizationInterface';
import axios from 'axios';
import Volunteer from '../../interfaces/VolunteerInterface';

function ActivitiesCard({ toggleNewActivityPopup }: { toggleNewActivityPopup: () => void }) {
    const [organizations, setOrganizations] = useState([] as Organization[]);
    const [volunteers, setVolunteers] = useState([] as Volunteer[]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/organizations")
            .then(res => setOrganizations(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3001/volunteers")
            .then(res => setVolunteers(res.data))
            .catch(err => console.log(err));
    }, []);


    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <CloseButton className={styles.closeButton} onClick={toggleNewActivityPopup} />
                <Form>
                    <h2 style={{ padding: '10px' }}>Dodaj aktivnost</h2>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control type="text" placeholder="Ime" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control type="date" placeholder="Ime" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control type="text" placeholder="Opis" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control type="text" placeholder="Lokacija" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Organizacija</Form.Label>
                        <Form.Select defaultValue="Organizacija">
                           {organizations.map((organization: Organization) => (
                                <option key={organization.id} value={organization.id}>{organization.name}</option>
                            ))}     
                        </Form.Select>
                    </Form.Group>
                    </Row>
                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Volonteri: </Form.Label>
                        <Form.Select multiple defaultValue="Organizacija">
                           {volunteers.map((volunteer: Volunteer) => (
                                <option key={volunteer.id} value={volunteer.id}>{volunteer.first_name}</option>
                            ))} 
                        </Form.Select>
                    </Form.Group>
                    </Row>

                </Form>
            </div>
        </div>
    );
}

export default ActivitiesCard;