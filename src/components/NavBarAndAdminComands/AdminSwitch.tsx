import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';


function AdminSwitch() {
  const { isAdmin , toggleAdmin } = useAdmin();
  const [localIsAdmin, setLocalIsAdmin] = useState(isAdmin);

  useEffect(() => {
    setLocalIsAdmin(isAdmin);
  }, [isAdmin]);

  return (    
    <Form.Group className="d-flex align-items-center">
      <Form.Label htmlFor="custom-switch" className="me-3">
        {localIsAdmin ? 'Admin' : 'Korisnik'}
      </Form.Label>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label=""
        checked={localIsAdmin}
        onChange={toggleAdmin}
      />
    </Form.Group>   
  );
}
  
export default AdminSwitch;