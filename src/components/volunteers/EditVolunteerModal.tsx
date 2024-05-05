import { Modal, Button, Form } from "react-bootstrap";
import { ListOfCities } from "../ListOfCities";
import styles from "./volunteers.module.css";
import Volunteer from "../../interfaces/VolunteerInterface";
import { useState,useEffect } from "react";

interface EditVolunteerModalProps {
  show: boolean;
  onHide: () => void;
  editingVolunteer: Volunteer | undefined;
  updateVolunteer: (updatedVolunteer: Volunteer) => void;
}

const EditVolunteerModal: React.FC<EditVolunteerModalProps> = ({
  show,
  onHide,
  editingVolunteer,
  updateVolunteer,
}) => {
  const [updatedVolunteerData, setUpdatedVolunteerData] = useState<Volunteer>(
    editingVolunteer || {
      first_name: "",
      last_name: "",
      city: "",
      preferences: [],
      gender: "",
    }
  );

  useEffect(() => {
    if (editingVolunteer) {
      setUpdatedVolunteerData(editingVolunteer);
    }
  }, [editingVolunteer]);

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    setUpdatedVolunteerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (updatedVolunteerData.preferences.includes(value)) {
      setUpdatedVolunteerData((prevData) => ({
        ...prevData,
        preferences: prevData.preferences.filter((pref) => pref !== value),
      }));
    } else {
      setUpdatedVolunteerData((prevData) => ({
        ...prevData,
        preferences: [...prevData.preferences, value],
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateVolunteer(updatedVolunteerData);
    onHide();
  };

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
          <Form.Control
            required
            className={styles.input}
            name="first_name"
            value={updatedVolunteerData.first_name}
            onChange={handleInput}
            type="text"
            placeholder="Ime"
          />
          <Form.Control
            required
            className={styles.input}
            name="last_name"
            value={updatedVolunteerData.last_name}
            onChange={handleInput}
            placeholder="Prezime"
          />
          <Form.Select
            required
            name="city"
            value={updatedVolunteerData.city}
            onChange={handleInput}
            className={styles.input}
          >
            <option>Odaberi...</option>
            {ListOfCities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </Form.Select>
          <article className={styles.activitiesAndGenderContainer}>
            <div className={styles.group}>
              <p>Aktivnosti:</p>
              <Form.Check label="Ekologija" value={"Ekologija"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"}   checked={updatedVolunteerData.preferences.includes("Ekologija")}/>
              <Form.Check label="Edukacija" value={"Edukacija"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"}   checked={updatedVolunteerData.preferences.includes("Edukacija")}/>
              <Form.Check label="Prijevoz" value={"Prijevoz"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"}   checked={updatedVolunteerData.preferences.includes("Prijevoz")}/>
              <Form.Check label="Zdravstvo" value={"Zdravstvo"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"}   checked={updatedVolunteerData.preferences.includes("Zdravstvo")}/>
              <Form.Check label="Kultura" value={"Kultura"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"}   checked={updatedVolunteerData.preferences.includes("Kultura")}/>
              <Form.Check label="Razno" value={"Razno"} onChange={handleCheckboxChange} name="preferences" type={"checkbox"}   checked={updatedVolunteerData.preferences.includes("Razno")}/>
            </div>
            <div className={styles.group}>
              <p>Spol:</p>
              <Form.Check required label="Muško" name="gender" value={"male"} checked={updatedVolunteerData.gender === "male"} onChange={handleInput} type={"radio"} />
              <Form.Check required label="Žensko" name="gender" value={"female"} checked={updatedVolunteerData.gender === "female"} onChange={handleInput} type={"radio"} />
            </div>
          </article>
          <Modal.Footer style={{paddingBottom: '0'}}>
            <Button variant="success" type="submit">
              Spremi Promjene
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditVolunteerModal;
