import { Modal, Button } from 'react-bootstrap';

interface ConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onHide, onConfirm, message }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Potvrda</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Ne</Button>
        <Button variant="danger" onClick={onConfirm}>Da</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;