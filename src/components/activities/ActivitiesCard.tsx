import Card from 'react-bootstrap/Card';
import { useAdmin } from '../AdminContext';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';



function ActivitiesCard({ name, description, date }: { name: string; description: string; date: string; }) {

    const { isAdmin, toggleAdmin } = useAdmin();

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <>
            <Card border="dark" style={{ width: '18rem', margin: '0.5rem' }} >
                <Card.Header onClick={togglePopup}>{date}</Card.Header>
                <Card.Body onClick={togglePopup} style={{ height: '8rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <Card.Title >{name}</Card.Title>
                    <Card.Text style={{ height: '4rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{description}</Card.Text>
                    
                </Card.Body>
                {
                        isAdmin &&
                        <Button style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', opacity: '0.8' }} onClick={toggleAdmin} variant="danger" >🗑</Button>
                    }
            </Card>


            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                    <Button style={{ position: 'absolute', top: '-0.6rem', right: '-0.6rem', padding: '0.3em'}} variant="warning" onClick={togglePopup} ><CloseButton /></Button>
                        <h2>{name}</h2>
                        <p>{description}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default ActivitiesCard;