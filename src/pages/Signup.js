import React from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';

class Signup extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container>
                <h1>Hello New Committee Member, Welcome Aboard!</h1>
                <Form >
                    <Col xs lg="5">
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your full name" />
                        </Form.Group>
                    
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                    
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Building community name</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                    
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                        </Form.Group>
                    </Form.Row>
                    
                    <Button variant="primary" type="submit">
                        Sign me up
                    </Button>
                    </Col>
                </Form>
            </Container>
        )
    }
}

export default Signup;