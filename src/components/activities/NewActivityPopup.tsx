import React, { useState, useEffect } from 'react';
import { CloseButton } from 'react-bootstrap';
import styles from './activities.module.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Organization from '../../interfaces/OrganizationInterface';
import axios from 'axios';
import Volunteer from '../../interfaces/VolunteerInterface';

function ActivitiesCard({ toggleNewActivityPopup, setActivities }: { toggleNewActivityPopup: () => void, setActivities: Function }) {
    const [organizations, setOrganizations] = useState([] as Organization[]);
    const [volunteers, setVolunteers] = useState([] as Volunteer[]);
    const [newActivityData, setNewActivityData] = useState({
        name: "",
        description: "",
        date: "",
        location: "",
        organization: "",
        volunteers: [] as string[]
    });

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

    function inputChange(event: any) {
        const { name, value } = event.target;

        if (name === 'date') {
            const [year, month, day] = value.split('-');
            const formattedDate = `${day}.${month}.${year}.`;
            setNewActivityData({ ...newActivityData, [name]: formattedDate });
        } else {
            setNewActivityData({ ...newActivityData, [name]: value });
        }
    }



    function handleVolunteersChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedVolunteers = Array.from(event.target.selectedOptions).map(option => option.value);
        setNewActivityData({ ...newActivityData, volunteers: selectedVolunteers });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); 

        console.log(newActivityData);

        axios.post('http://localhost:3001/activities', newActivityData)
        .then(rez => {
            axios.get("http://localhost:3001/activities")
              .then(rez => setActivities(rez.data));
        });
    
       
        setNewActivityData({
            name: "",
            description: "",
            date: "",
            location: "",
            organization: "",
            volunteers: []
        });
    }

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <CloseButton className={styles.closeButton} onClick={toggleNewActivityPopup} />
                <Form onSubmit={handleSubmit}>
                    <h2 style={{ padding: '10px' }}>Dodaj aktivnost</h2>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Control required type="text" name='name' value={newActivityData.name} onChange={inputChange} placeholder="Ime" />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control required type="date" name='date' onChange={inputChange} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Control required type="text" name='description' value={newActivityData.description} onChange={inputChange} placeholder="Opis" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Control required type="text" name='location' value={newActivityData.location} onChange={inputChange} placeholder="Lokacija" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} required controlId="formGridState">
                        <Form.Label>Organizacija</Form.Label>
                            <Form.Select required name='organization' onChange={inputChange}>
                            <option value="">Odaberi organizaciju</option>
                                {organizations.map((organization: Organization) => (
                                    <option key={organization.id} value={organization.id}>{organization.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Volonteri: </Form.Label>
                            <Form.Select multiple name="volunteers" value={newActivityData.volunteers} onChange={handleVolunteersChange}>
                                {volunteers.map((volunteer: Volunteer) => (
                                    <option key={volunteer.id} value={volunteer.id}>{volunteer.first_name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button variant="success" type="submit" >
                        Dodaj
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default ActivitiesCard;