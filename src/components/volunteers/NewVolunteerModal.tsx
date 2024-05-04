import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ListOfCities } from "../ListOfCities";
import styles from "./volunteers.module.css";
import Volunteer from "../../interfaces/VolunteerInterface";
import { useState, useEffect} from "react";
import axios from "axios";

interface NewVolunteerModalProps {
  show: boolean;
  onHide: () => void;
  addNewVolunteer: (newVolunteer: Volunteer) => void;
}


const NewVolunteerModal: React.FC<NewVolunteerModalProps> = ({
  show,
  onHide,
  addNewVolunteer,
}) => {
  const [newVolunteerData, setNewVolunteerData] = useState({
    first_name: "",
    last_name: "",
    city: "",
    gender: "",
    preferences: [] as String[],
  })
  const [volunteers, setVolunteers] = useState([] as Volunteer[]);



  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (newVolunteerData.preferences.includes(value)) {
      setNewVolunteerData(prevData => ({
        ...prevData,
        preferences: prevData.preferences.filter(pref => pref !== value)
      }));
    } else {
      setNewVolunteerData(prevData => ({
        ...prevData,
        preferences: [...prevData.preferences, value]
      }));
    }
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    setNewVolunteerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(newVolunteerData);
  };

  function addNewVolunteerFunction(newVolunteer: Volunteer) {
    axios
      .post("http://localhost:3001/volunteers", newVolunteer)
      .then(res => {
        setVolunteers(prevVolunteers => [...prevVolunteers, res.data]);
        addNewVolunteer(res.data); 
      })
      .catch(err => console.error("Error adding new volunteer:", err));
}


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addNewVolunteerFunction(newVolunteerData as Volunteer);
    
    
    setNewVolunteerData({
      first_name: "",
      last_name: "",
      city: "",
      gender: "",
      preferences: [] as String[],
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
          Prijava novog volontera
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control required className={styles.input} name="first_name" value={newVolunteerData.first_name} onChange={handleInput} type="text" placeholder="Ime" />
          <Form.Control required className={styles.input} name="last_name" value={newVolunteerData.last_name} onChange={handleInput} placeholder="Prezime" />
          <Form.Select required name="city" value={newVolunteerData.city} onChange={handleInput} className={styles.input} >
            <option>Odaberi...</option>
            {ListOfCities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </Form.Select>
          <article className={styles.activitiesAndGenderContainer}>
            <div className={styles.group}>
              <p>Aktivnosti:</p>
              <Form.Check label="Ekologija" value={"Ekologija"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"} />
              <Form.Check label="Edukacija" value={"Edukacija"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"} />
              <Form.Check label="Prijevoz" value={"Prijevoz"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"} />
              <Form.Check label="Zdravstvo" value={"Zdravstvo"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"} />
              <Form.Check label="Kultura" value={"Kultura"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"} />
              <Form.Check label="Razno" value={"Razno"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"} />
            </div>
            <div className={styles.group}>
              <p>Spol:</p>
              <Form.Check required label="Muško" name="gender" value={"male"} onChange={handleInput} type={"radio"} />
              <Form.Check required label="Žensko" name="gender" value={"female"} onChange={handleInput} type={"radio"} />
            </div>
          </article>
          <Modal.Footer>
            <Button variant="success" type="submit">Prijavi</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


export default NewVolunteerModal;
