import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ListOfCities } from "../ListOfCities";
import styles from "./volunteers.module.css";



function NewVolunteerModal(props : { show: boolean, onHide: () => void; }) {


    return (
      <Modal
        {...props}
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
          <Form.Control className={styles.input} type="text" placeholder="Ime" />
          <Form.Control className={styles.input} type="text" placeholder="Prezime" />
          <Form.Select className={styles.input} defaultValue="Odaberi...">
              <option>Odaberi...</option>
              {ListOfCities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </Form.Select>
            <article className={styles.activitiesAndGenderContainer}>
            <div className={styles.group}>
              <p>Aktivnosti:</p>
            <Form.Check label="Ekologija" name="group1" type={"checkbox"} />
            <Form.Check label="Edukacija" name="group1" type={"checkbox"} />
            <Form.Check label="Prijevoz" name="group1" type={"checkbox"} />
            <Form.Check label="Zdravstvo" name="group1" type={"checkbox"} />
            <Form.Check label="Kultura" name="group1" type={"checkbox"} />
            <Form.Check label="Razno" name="group1" type={"checkbox"} />
          </div>
          <div className={styles.group}>
          <p>Spol:</p>
          <Form.Check label="Muško" name="group1" type={"radio"} />
          <Form.Check label="Žensko" name="group1" type={"radio"} />
          </div>
</article>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" onClick={props.onHide}>Prijavi</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  export default NewVolunteerModal;
