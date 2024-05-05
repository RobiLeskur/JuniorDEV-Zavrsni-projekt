import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Organization from '../../interfaces/OrganizationInterface';
import Activity from '../../interfaces/ActivityInterface';


interface OrganizationModalProps {
    organization: Organization;
    showModal: boolean;
    onCloseModal: () => void;
    activities: Activity[];
}

const OrganizationDetails: React.FC<OrganizationModalProps> = ({ organization, showModal, onCloseModal, activities }) => {

    const associatedActivities = activities.filter(activity => organization.activity_ids.includes(activity.id));
    const activitiesSentence = associatedActivities.map(activity => activity.name).join(', ');


    return (
        <Modal show={showModal} onHide={onCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{organization.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Grad: {organization.city}</p>
                <p>Adresa: {organization.address}</p>
                <p>Aktivnosti: {activitiesSentence}</p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onCloseModal}>Zatvori</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrganizationDetails;