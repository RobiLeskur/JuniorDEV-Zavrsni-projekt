import Volunteer from '../../interfaces/VolunteerInterface';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';

function AddVolunteerToActivityForm({ volunteers, onAddVolunteer }: {volunteers: Volunteer[]; onAddVolunteer: (selectedVolunteer: Volunteer) => void}) {
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleAddVolunteer = () => {
    if (selectedVolunteer) {
        onAddVolunteer(selectedVolunteer);
        setShowConfirmationModal(false);
    }
};

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Dodaj Volontera</Form.Label>
        <Form.Select
          onChange={(e) => setSelectedVolunteer(volunteers.find(volunteer => volunteer.id === e.target.value) || null)}
        >
          <option>...</option>
          {volunteers.map((volunteer) => (
            <option key={volunteer.id} value={volunteer.id}>{volunteer.first_name} {volunteer.last_name}</option>
          ))}
        </Form.Select>
      </Form.Group>
      {
        selectedVolunteer &&
      <Button onClick={() => setShowConfirmationModal(true)}>Dodaj volontera</Button>
    }
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        onConfirm={handleAddVolunteer}
        message={"Dodaj volontera " + selectedVolunteer?.first_name + " " + selectedVolunteer?.last_name + " na aktivnost" }
      />
      
    </>
  );
}

export default AddVolunteerToActivityForm;