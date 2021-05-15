import React from 'react';
import { Alert, Button, Col, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './pages.css'

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '', 
            pwd: '',
            communityName: '',
            address: '',
            city: '',
            errorText: ''
        }
    }
    CreateMember = () => {
        const newMember = {
            id: uuidv4(),
            name: this.state.name,
            email: this.state.email, 
            pwd: this.state.pwd,
            communityName: this.state.communityName,
            address: this.state.address,
            city: this.state.city
        }
        // TODO: if email exists make alert bootstrap/ add validation in state
        const foundEmail = this.props.allMembers.find(memberObj => {
            return (memberObj.email === newMember.email)
        })
            if (foundEmail) {
                this.setState({
                    errorText: `Email adress is already exists. Please enter a new one, or try to login.`
                }) 
            }
            else {
                this.props.addMember(newMember)
                window.location.href="/#/member-dashboard"
            }      
    }    
    render(){
        return(
            <Container>
                <h1>Hello New Committee Member, Welcome Aboard!</h1>
                <Form >
                    <Col xs lg="5">
                        <Form.Group controlId="formGroupFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control onChange={(e)=>this.setState({name: e.target.value})} type="text" placeholder="Enter your full name" />
                        </Form.Group>
                        
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e)=>this.setState({email: e.target.value})} type="email" placeholder="Enter email" />
                        </Form.Group>
                        {this.state.errorText ? <Alert  variant="danger" onClose={() => {}} dismissible>{this.state.errorText}</Alert>:null}
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e)=>this.setState({pwd: e.target.value})} type="password" placeholder="Password" />
                        </Form.Group>
                        
                        <Form.Group controlId="formGroupCommunity">
                            <Form.Label>Community name</Form.Label>
                            <Form.Control onChange={(e)=>this.setState({communityName: e.target.value})} placeholder="Enter an original name" />
                        </Form.Group>
                        
                        <Form.Group controlId="formGridAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control onChange={(e)=>this.setState({address: e.target.value})} placeholder="1234 Main St" />
                        </Form.Group>

                        <Form.Group controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control onChange={(e)=>this.setState({city: e.target.value})} placeholder="Tel-Aviv"/>
                        </Form.Group>
                        
                        <Button onClick={this.CreateMember} variant="primary" type="button">
                            Sign me up
                        </Button>
                        <Link className="signup-linkToLogin" to="/login">Login</Link>
                    </Col>
                </Form>
            </Container>
        )
    }
}

export default Signup;