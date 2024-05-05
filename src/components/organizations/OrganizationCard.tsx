import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Organization from '../../interfaces/OrganizationInterface';
import styles from './organizations.module.css';
import Activity from '../../interfaces/ActivityInterface';

interface OrganizationCardProps {
  organization: Organization;
  onShowModal: () => void;
}

function OrganizationCard({ organization, onShowModal }: OrganizationCardProps): JSX.Element {
  return (
    <div className={styles.row}>
      <Card className={styles.card}>
          <span>{organization.name}</span>
          <Button variant="primary" onClick={onShowModal}>Detalji</Button>
      </Card>
 
        <Button className={styles.deleteButton} variant="danger">🗑️</Button>
        
    </div>
  );
}

export default OrganizationCard;