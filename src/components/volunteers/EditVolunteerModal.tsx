import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Volunteer from '../../interfaces/VolunteerInterface';

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
  const [updatedVolunteerData, setUpdatedVolunteerData] = useState<Volunteer>({
    ...editingVolunteer!,
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedVolunteerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateVolunteer(updatedVolunteerData);
    onHide();
  };


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Volunteer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            name="first_name"
            value={updatedVolunteerData.first_name}
            onChange={handleInput}
            type="text"
            placeholder="First Name"
          />
          {/* Other input fields for editing */}
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditVolunteerModal;
