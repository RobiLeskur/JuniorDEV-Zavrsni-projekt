import styles from './volunteers.module.css';
import { ListOfCities } from '../ListOfCities';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import NewVolunteerModal from './NewVolunteerModal';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Volunteer from '../../interfaces/VolunteerInterface';
import DisplayVolunteers from './DisplayVolunteers';


function VolunteersPage({}: {}) {
  const [modalShow, setModalShow] = useState(false);
  const [volunteers, setVolunteers] = useState([] as Volunteer[]);
  const [newVolunteerData, setNewVolunteerData] = useState({
    first_name: "",
    last_name: "",
    city: "",
    gender: "",
    preferences: [] as String[],
  })
  
  useEffect(() => {
    axios
        .get("http://localhost:3001/volunteers")
        .then(res => setVolunteers(res.data))
        .catch(err => console.log(err));
}, []);


function deleteVolunteer(volunteerId: string) {
  axios
        .delete('http://localhost:3001/volunteers/' + volunteerId)
        .then(() => {
            setVolunteers(prevVolunteers => prevVolunteers.filter(volunteer => volunteer.id !== volunteerId));
        })
        .catch(err => {
            console.log(err);
        });
}


function handleNewVolunteer(){
  console.log(newVolunteerData);
  
/* 
   axios
  .post("http://localhost:3001/volunteers", newVolunteerData)
  .then(res => {
    axios.get("http://localhost:3001/volunteers")
      .then(rez => setVolunteers(rez.data));
});  */


  setModalShow(false)
}



  return (
    <>
      <div className={styles.container}>
        <article className={styles.left}>
          <h2>Filter:</h2>
          <Form.Group>
            <Form.Label>Grad</Form.Label>
            <Form.Select defaultValue="Odaberi...">
              <option>Odaberi...</option>
              {ListOfCities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </Form.Select>
            </Form.Group>
          <div className={styles.group}>
            <Form.Check label="Ekologija" name="group1" type={"radio"} />
            <Form.Check label="Edukacija" name="group1" type={"radio"} />
            <Form.Check label="Prijevoz" name="group1" type={"radio"} />
            <Form.Check label="Zdravstvo" name="group1" type={"radio"} />
            <Form.Check label="Kultura" name="group1" type={"radio"} />
            <Form.Check label="Razno" name="group1" type={"radio"} />
          </div>
          
          

          <Button className={styles.addNewVolunteer} variant="success" type="button" onClick={() => setModalShow(true)}>Novi</Button>

          <NewVolunteerModal
            show={modalShow}
            onHide={handleNewVolunteer}
          />
        </article>


        <article className={styles.right}>

        <DisplayVolunteers volunteers={volunteers as Volunteer[]} deleteVolunteer={deleteVolunteer} />


        </article>
      </div>
    </>
  );
}

export default VolunteersPage;