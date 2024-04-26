import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import AdminSwitch from './AdminSwitch';
import { useContext } from 'react';
import AdminContext from './AdminContext';

function NavBar(toggleAdmin: any, isAdmin: any) {


  return (
    <Navbar sticky='top'  expand="lg" className="bg-body-tertiary">
      <Container>   
        <Navbar.Brand as={Link} to='/about'>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
            <Nav.Link><AdminSwitch /></Nav.Link>
          
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;