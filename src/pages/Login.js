import React from 'react';
import { Alert, Button, Col, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './pages.css'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '', 
            pwd: '',
            errorText: ''
        }
    }

    validateData = () => {
        const validation = this.props.allTenants.find(tenantObj => {
            if(tenantObj.email.toLowerCase() === this.state.email.toLowerCase() && tenantObj.pwd === this.state.pwd){
                this.props.login(tenantObj)
                window.location.href = "/#/dashboard"
                
            }
            else {
                this.setState({
                    errorText: "Incorrect email address or password"
                })
            }
        })
    }

    render(){
        return(
            <Container>
                <h1>Welcome Back</h1>
                <Form>
                    <Col xs lg="5">
                        {this.state.errorText ? <Alert variant="danger" onClose={() => {}} dismissible>{this.state.errorText}</Alert> : null}
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} type="email" placeholder="Enter email" />
                        </Form.Group>
                        
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => this.setState({pwd: e.target.value})} value={this.state.pwd} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button onClick={this.validateData} variant="primary" type="button">
                        Log me in
                        </Button>
                        <Link className="login-linkToSignup" to="/signup">SignUp</Link>
                    </Col>
                </Form>
            </Container>
        )
    }
}

export default Login;