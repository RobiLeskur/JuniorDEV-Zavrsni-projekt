import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Organization from '../../interfaces/OrganizationInterface';
import styles from './organizations.module.css';
import Activity from '../../interfaces/ActivityInterface';

interface OrganizationCardProps {
  organization: Organization;
  onShowModal: () => void;
  isActive: boolean;
  deleteOrganization: (organization: Organization) => void;
  uploadOrganization: (organization: Organization) => void;
}

function OrganizationCard({ organization, onShowModal, isActive, deleteOrganization, uploadOrganization }: OrganizationCardProps): JSX.Element {
  return (
    <div className={styles.row}>
      <Card className={styles.card}>
          <span>{organization.name}</span>
          <Button variant="primary" onClick={onShowModal}>Detalji</Button>
      </Card>
 
      {isActive ? (
        <Button className={styles.deleteButton} onClick={() => deleteOrganization(organization)} variant="danger">🗑️</Button>
      ) : (
        <Button className={styles.deleteButton} onClick={() => uploadOrganization(organization)} variant="success">🢁</Button>
      )}
        
    </div>
  );
}

export default OrganizationCard;