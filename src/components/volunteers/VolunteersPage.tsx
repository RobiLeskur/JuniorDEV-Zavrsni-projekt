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
import Activity from '../../interfaces/ActivityInterface';
import ConfirmationModal from '../ConfirmationModal';

function VolunteersPage({activities }: {activities: Activity[]}) {
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false); 
  const [volunteers, setVolunteers] = useState([] as Volunteer[]);
  const [volunteerToEdit, setVolunteerToEdit] = useState<Volunteer | undefined>(); 
  const [confirmDeleteShow, setConfirmDeleteShow] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState<Volunteer | undefined>();


  const [filters, setFilters] = useState({
    city: '',
    preferences: '',
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
      axios
        .put(`http://localhost:3001/volunteers/${updatedVolunteer.id}`, updatedVolunteer)
        .then(() => {
          setVolunteers(prevVolunteers => {
            return prevVolunteers.map(volunteer => {
              if (volunteer.id === updatedVolunteer.id) {
                return updatedVolunteer;
              }
              return volunteer;
            });
          });
          setEditModalShow(false);
        })
        .catch(err => {
          console.log(err);
        });
  }
  
  const handleDeleteConfirm = () => {
    if (volunteerToDelete) {
      deleteVolunteer(volunteerToDelete.id);
      setVolunteerToDelete(undefined);
      setConfirmDeleteShow(false);
    }
  };

  const handleDeleteClick = (volunteer: Volunteer) => {
    setVolunteerToDelete(volunteer);
    setConfirmDeleteShow(true);
  };
  

  function deleteVolunteer(volunteerId: string | undefined) {
    if (!volunteerId) {
      console.error('Volunteer ID is not defined.');
      return;
    }
  
    axios
      .delete(`http://localhost:3001/volunteers/${volunteerId}`)
      .then(() => {
        setVolunteers(prevVolunteers => prevVolunteers.filter(volunteer => volunteer.id !== volunteerId));

        activities.forEach(activity => {
          if (activity.volunteers.includes(volunteerId)) {
            activity.volunteers = activity.volunteers.filter(id => id !== volunteerId);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }


  function editVolunteer(volunteer: Volunteer) {
  
    setVolunteerToEdit(volunteer); 
    setEditModalShow(true); 
  
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
      (filters.preferences === '' || volunteer.preferences.includes(filters.preferences))
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
              <option value={""}>Sve</option>
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


{volunteerToEdit && (
          <EditVolunteerModal
            show={editModalShow}
            onHide={() => setEditModalShow(false)}
            editingVolunteer={volunteerToEdit}
            updateVolunteer={updateVolunteer} 
          />
        )}

<ConfirmationModal
        show={confirmDeleteShow}
        onHide={() => setConfirmDeleteShow(false)}
        onConfirm={handleDeleteConfirm}
        message="Jeste li sigurni da želite ukloniti ovog volontera?"
      />

        </article>


        <article className={styles.right}>

          <DisplayVolunteers volunteers={filteredVolunteers as Volunteer[]} deleteVolunteer={handleDeleteClick} editVolunteer={editVolunteer}/>


        </article>
      </div>
    </>
  );
}

export default VolunteersPage;