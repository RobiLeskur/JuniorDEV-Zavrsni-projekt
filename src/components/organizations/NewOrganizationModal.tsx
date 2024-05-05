import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ListOfCities } from "../ListOfCities";
import Volunteer from "../../interfaces/VolunteerInterface";
import { useState, useEffect} from "react";
import axios from "axios";
import styles from "./organizations.module.css";
import Organization from "../../interfaces/OrganizationInterface";


function NewOrganizationModal({show, onHide, addPendingOrganization} : {show: boolean, onHide: () => void, addPendingOrganization: (organization: Organization) => void}){
    const [newOrganizationData, setNewOrganizationData] = useState({
        name: "",
        city: "",
        address: "",
      })


  const handleInput = (event: any) => {
    const { name, value } = event.target;
    setNewOrganizationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
/* 
  function addNewVolunteerFunction(newVolunteer: Volunteer) {
    axios
      .post("http://localhost:3001/volunteers", newVolunteer)
      .then(res => {
        setVolunteers(prevVolunteers => [...prevVolunteers, res.data]);
        addNewVolunteer(res.data); 
      })
      .catch(err => console.error("Error adding new volunteer:", err));
} */

function generateRandomId(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < 4; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomString;
}

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
   
    const newOrganization: Organization = {
      id: generateRandomId(),
      name: newOrganizationData.name,
      city: newOrganizationData.city,
      address: newOrganizationData.address,
      activity_ids: [],
  };
    
  addPendingOrganization(newOrganization);
    
    setNewOrganizationData({
      name: "",
      city: "",
      address: "",
    })
    
    onHide();
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Nova Organizacija
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control required className={styles.input} name="name" value={newOrganizationData.name} onChange={handleInput} type="text" placeholder="Ime" />
          <Form.Control required className={styles.input} name="address" value={newOrganizationData.address} onChange={handleInput} placeholder="Adresa" />
          <p>Grad</p>
          <Form.Select required name="city" value={newOrganizationData.city} onChange={handleInput} className={styles.input} >
            <option value={""}>...</option>
            {ListOfCities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </Form.Select>
          <Modal.Footer style={{paddingBottom: '0'}}>
            <Button variant="success" type="submit">Prijavi</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


export default NewOrganizationModal;
