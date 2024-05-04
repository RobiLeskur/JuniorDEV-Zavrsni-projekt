import styles from './volunteers.module.css';
import { ListOfCities } from '../ListOfCities';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import NewVolunteerModal from './NewVolunteerModal';
import EditVolunteerModal from './EditVolunteerModal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Volunteer from '../../interfaces/VolunteerInterface';
import DisplayVolunteers from './DisplayVolunteers';

function VolunteersPage({ }: {}) {
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false); 
  const [volunteers, setVolunteers] = useState([] as Volunteer[]);
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | undefined>(); 

  const [filters, setFilters] = useState({
    city: '',
    category: '',
    gender: ''
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/volunteers")
      .then(res => setVolunteers(res.data))
      .catch(err => console.log(err));
  }, []);


  function addNewVolunteer(newVolunteer: Volunteer) {
    setVolunteers(prevVolunteers => [...prevVolunteers, newVolunteer]);
  }

  function updateVolunteer(updatedVolunteer: Volunteer) {
  
  
  }

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
  function editVolunteer(volunteer: Volunteer) {
  
    setEditingVolunteer(volunteer); 
    setModalShow(true); 
  
  }



  useEffect(() => {
    axios
      .get("http://localhost:3001/volunteers")
      .then(res => setVolunteers(res.data))
      .catch(err => console.log(err));
  }, []);


  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  }

  const filteredVolunteers = volunteers.filter(volunteer => {
    return (
      (filters.city === '' || volunteer.city === filters.city) &&
      (filters.gender === '' || volunteer.gender === filters.gender) &&
      (filters.category === '' || volunteer.preferences.includes(filters.category))
    );
  });






  return (
    <>
      <div className={styles.container}>
        <article className={styles.left}>
          <h2>Filter:</h2>
          <Form.Group>
            <Form.Label>Grad</Form.Label>
            <Form.Select name='city' onChange={handleFilterChange} value={filters.city}>
              <option>Odaberi...</option>
              {ListOfCities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <article className={styles.activitiesAndGenderContainer} >
            <div className={styles.group}>
              <p>Aktivnost:</p>
              <Form.Check label="Ekologija" value={"Ekologija"} onChange={handleFilterChange} name="preferences" type={"radio"} />
              <Form.Check label="Edukacija" value={"Edukacija"} onChange={handleFilterChange} name="preferences" type={"radio"} />
              <Form.Check label="Prijevoz" value={"Prijevoz"} name="preferences" onChange={handleFilterChange} type={"radio"} />
              <Form.Check label="Zdravstvo" value={"Zdravstvo"} name="preferences" onChange={handleFilterChange} type={"radio"} />
              <Form.Check label="Kultura" value={"Kultura"} name="preferences" onChange={handleFilterChange} type={"radio"} />
              <Form.Check label="Razno" value={"Razno"} name="preferences" onChange={handleFilterChange} type={"radio"} />
              <Form.Check label="Sve" value={""} name="preferences" onChange={handleFilterChange} type={"radio"} />

            </div>
            <div className={styles.group}>
              <p>Spol:</p>
              <Form.Check label="Muško" value={"male"} name="gender" onChange={handleFilterChange} type={"radio"} />
              <Form.Check label="Žensko" value={"female"} name="gender" onChange={handleFilterChange} type={"radio"} />
              <Form.Check label="Sve" value={""} name="gender" onChange={handleFilterChange} type={"radio"} />

            </div>

          </article>


          <Button className={styles.addNewVolunteer} variant="success" type="button" onClick={() => setModalShow(true)}>Novi</Button>

          <NewVolunteerModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            addNewVolunteer={addNewVolunteer}
          
          />


{editingVolunteer && (
          <EditVolunteerModal
            show={editModalShow}
            onHide={() => setEditModalShow(false)}
            editingVolunteer={editingVolunteer}
            updateVolunteer={updateVolunteer} 
          />
        )}

        </article>


        <article className={styles.right}>

          <DisplayVolunteers volunteers={filteredVolunteers as Volunteer[]} deleteVolunteer={deleteVolunteer} editVolunteer={editVolunteer}/>


        </article>
      </div>
    </>
  );
}

export default VolunteersPage;