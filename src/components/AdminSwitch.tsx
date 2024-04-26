import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import AdminContext from './AdminContext';

function AdminSwitch() {

  const admin = useContext(AdminContext)

    return (    
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label={
          admin.isAdmin === true ? 'Admin' : 'Korisnik'
        }
        checked={admin.isAdmin}
        onChange={admin.toggleAdmin}
      />    
    );
}
  
  export default AdminSwitch;