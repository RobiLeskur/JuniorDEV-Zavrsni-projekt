import styles from './organizations.module.css';
import { useState, useEffect } from 'react';
import OrganizationCard from './OrganizationCard';
import axios from 'axios';
import Activity from '../../interfaces/ActivityInterface';
import OrganizationDetails from './OrganizationDetails';
import Organization from '../../interfaces/OrganizationInterface';
import { Button } from 'react-bootstrap';
import NewOrganizationModal from './NewOrganizationModal';

function OrganizationsPage({ activities }: { activities: Activity[] }) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [detailsShow, setDetailsShow] = useState<boolean>(false);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
    const [newOrganizationModalShow, setNewOrganizationModalShow] = useState<boolean>(false);


    useEffect(() => {
        axios
            .get("http://localhost:3001/organizations")
            .then(res => {
                setOrganizations(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    const handleShowModal = (organizationId: string) => {
        const organization = organizations.find(org => org.id === organizationId);
        setSelectedOrganization(organization || null);
        setDetailsShow(true);
    };

    return (
        
        <div className={styles.organizationsContainer}>
            <h1>Organizacije</h1>
            <hr />
            {organizations.map(organization =>
                <OrganizationCard
                    key={organization.id}
                    organization={organization}
                    onShowModal={() => handleShowModal(organization.id)}
                />
            )}

            {selectedOrganization && (
                <OrganizationDetails
                    organization={selectedOrganization}
                    showModal={detailsShow}
                    onCloseModal={() => setDetailsShow(false)}
                    activities={activities}
                />
            )}


            <NewOrganizationModal
                show={newOrganizationModalShow}
                onHide={() => setNewOrganizationModalShow(false)}
            />

<Button variant="success" className={styles.newOrganizationBtn} onClick={() => setNewOrganizationModalShow(true)}>Nova Organizacija</Button>
        </div>
    );
}

export default OrganizationsPage;
