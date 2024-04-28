import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import AdminSwitch from './AdminSwitch';
import { useContext } from 'react';


function NavBar() {


  return (
    <Navbar sticky='top'  expand="sm" className="bg-body-tertiary">
      <Container>   
        <Navbar.Brand as={Link} to='/'>CroVolonteri</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link as={Link} to='/activities'>Aktivnosti</Nav.Link>  
            <Nav.Link as={Link} to='/volonteri'>Volonteri</Nav.Link>
            <Nav.Link as={Link} to='/udruge'>Udruge</Nav.Link>      
          </Nav>
          <Nav>
          <AdminSwitch />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;