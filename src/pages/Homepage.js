import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './pages.css';
import maxresdefault from "./maxresdefault.jpg"

class Homepage extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/#/">HOA Systems</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <Nav.Link href="/#/login">Login</Nav.Link>
                        <Nav.Link href="/#/signup">Sign Up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="hompage-img">
                    <img src={maxresdefault}/>
                </div>
            </div>
        )
    }
}

export default Homepage;