import React from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';

class Login extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container>
                <h1>Welcome Back</h1>
                <Form>
                    <Col xs lg="5">
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                        Log me in
                        </Button>
                    </Col>
                </Form>
            </Container>
        )
    }
}

export default Login;