import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Activity from '../../interfaces/ActivityInterface';
import Organization from '../../interfaces/OrganizationInterface';
import NewOrganizationModal from './NewOrganizationModal';
import styles from './organizations.module.css';
import OrganizationCard from './OrganizationCard';
import OrganizationDetails from './OrganizationDetails';
import { useAdmin } from '../NavBarAndAdminComands/AdminContext';
import ConfirmationModal from '../ConfirmationModal';

function OrganizationsPage({ activities }: { activities: Activity[] }) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [detailsShow, setDetailsShow] = useState<boolean>(false);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
    const [newOrganizationModalShow, setNewOrganizationModalShow] = useState<boolean>(false);
    const [pendingOrganizations, setPendingOrganizations] = useState<Organization[]>([]);
    const [confirmationModalShow, setConfirmationModalShow] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<string>('asc'); 

    const { isAdmin, toggleAdmin } = useAdmin();

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

   


    const handleSortChange = (criteria: keyof Organization) => {
        if (sortBy === criteria) {
 
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(criteria);
            setSortOrder('asc');
        }

        let sortedOrganizations = [...organizations];
        sortedOrganizations.sort((a, b) => {
            if (a[criteria] < b[criteria]) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (a[criteria] > b[criteria]) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setOrganizations(sortedOrganizations);
    };

    function deleteOrganization() {
        if (!selectedOrganization) return;

        axios.delete(`http://localhost:3001/organizations/${selectedOrganization.id}`)
            .then(res => {
                console.log("Organization deleted successfully:", res.data);
                setOrganizations(prevOrganizations => prevOrganizations.filter(org => org.id !== selectedOrganization.id));
                setConfirmationModalShow(false);
            })
            .catch(err => {
                console.error("Error deleting organization:", err);
            });
    }

    function uploadOrganization(organization: Organization) {
        axios.post("http://localhost:3001/organizations", organization)
            .then(res => {
                console.log("Organization uploaded successfully:", res.data);
                setOrganizations(prevOrganizations => [...prevOrganizations, res.data]);
                setPendingOrganizations(prevPendingOrganizations => prevPendingOrganizations.filter(org => org.id !== organization.id));
            })
            .catch(err => {
                console.error("Error uploading organization:", err);
            });
    }


    const handleShowModal = (organizationId: string) => {
        let organization = organizations.find(org => org.id === organizationId);
        if (!organization) {
            organization = pendingOrganizations.find(org => org.id === organizationId);
        }
        setSelectedOrganization(organization || null);
        setDetailsShow(true);
    };

    const addPendingOrganization = (organization: Organization) => {
        setPendingOrganizations(prevPendingOrganizations => [...prevPendingOrganizations, organization]);
    };

    return (
        <div className={styles.organizationsContainer}>
            <h1>Organizacije</h1>
            <hr />
            <div style={{marginBottom: '20px', display: 'flex'}}>
                <Button style={{marginRight: '10px'}} variant="primary" onClick={() => handleSortChange('name')}>Sortiraj po imenu</Button>
                <Button style={{marginRight: '10px'}} variant="primary" onClick={() => handleSortChange('address')}>Sortiraj po adresi</Button>
                <Button variant="primary" onClick={() => handleSortChange('city')}>Sortiraj po gradu</Button>
            </div>
            {organizations.map(organization =>
                <OrganizationCard
                    key={organization.id}
                    organization={organization}
                    onShowModal={() => handleShowModal(organization.id)}
                    deleteOrganization={() => {
                        setSelectedOrganization(organization);
                        setConfirmationModalShow(true);
                    }}
                    uploadOrganization={() => uploadOrganization(organization)}
                    isActive={true}
                />
            )}

            {(pendingOrganizations.length > 0 && isAdmin) && (
                <>
                    <h1 style={{ marginTop: '20px' }}>Pending Organizations</h1>
                    <hr />
                    {pendingOrganizations.map(organization =>
                        <OrganizationCard
                            key={organization.id}
                            organization={organization}
                            onShowModal={() => handleShowModal(organization.id)}
                            deleteOrganization={() => {
                                setSelectedOrganization(organization);
                                setConfirmationModalShow(true);
                            }}
                            uploadOrganization={() => uploadOrganization(organization)}
                            isActive={false}
                        />
                    )}
                </>
            )
            }

            {(pendingOrganizations.length === 0 && isAdmin) &&
                <>
                    <h1 style={{ marginTop: '20px' }}>Zahtjevi za odobrenje</h1>
                    <hr />
                    <h2>Trenutno nema organizacija za obradu</h2>
                </>
            }

            <NewOrganizationModal
                show={newOrganizationModalShow}
                onHide={() => setNewOrganizationModalShow(false)}
                addPendingOrganization={addPendingOrganization}
            />
            {selectedOrganization && (
                <OrganizationDetails
                    organization={selectedOrganization}
                    showModal={detailsShow}
                    onCloseModal={() => setDetailsShow(false)}
                    activities={activities}
                />
            )}

            <ConfirmationModal
                show={confirmationModalShow}
                onHide={() => setConfirmationModalShow(false)}
                onConfirm={deleteOrganization}
                message={`Da li ste sigurni da želite obrisati organizaciju "${selectedOrganization?.name}"?`}
            />

            <Button variant="success" className={styles.newOrganizationBtn} onClick={() => setNewOrganizationModalShow(true)}>Nova Organizacija</Button>
        </div>
    );
}

export default OrganizationsPage;