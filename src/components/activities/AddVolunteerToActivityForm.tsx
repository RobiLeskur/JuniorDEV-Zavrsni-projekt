import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

function AddVolunteerToActivityForm(){


    return (
        <Form>
          <Row>
            <Col>
              <Form.Control style={{marginBottom: '5px'}} placeholder="First name" />
            
              <Form.Control placeholder="Last name" />
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button variant="success" type="submit">Prijavi</Button>
            </Col>
          </Row>
        </Form>
      );
    

}

export default AddVolunteerToActivityForm