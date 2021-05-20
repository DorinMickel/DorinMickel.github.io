import React from 'react';
import { Button, Container, Form, ListGroup, Modal } from 'react-bootstrap';
import './pages.css'
import { v4 as uuidv4 } from 'uuid';

class Tenants extends React.Component{
    constructor(props){
        super(props);
        this.state={
            index: -1,
            name: '',
            email: '',
            pwd: '',
            apt: '',
            isTenantDetailsOpen: false,
            isModalOpen: false,
        }
    }
    showDetails = (tenantObj) => {     
        const index = this.props.allTenants.indexOf(tenantObj)
        this.setState({
            index: index,
            name: tenantObj.name,
            email: tenantObj.email,
            apt: tenantObj.apt,
            isTenantDetailsOpen: ! this.state.isTenantDetailsOpen
        })
    }
    openModal = () => {
        this.setState({
            isModalOpen: true,
            index: -1,
            name: '',
            email: '',
            pwd: '',
            apt: '',
        })
    }
    closeModal = () => {
        this.setState({
            isModalOpen: false
        })
    }
    addTanent = () => {
        const tanentObj = {
            id: uuidv4(),
            name: this.state.name,
            email: this.state.email,
            pwd: this.state.pwd,
            apt: this.state.apt,
        }
        this.closeModal()
        this.props.addNewTenant(tanentObj)
    }

    filterTenants = (event) => {
        const inputText = event.target.value
        if(inputText != ''){
            this.props.filterTenants(event.target.value)
        }
        else {
            this.props.filterTenants('')
        }   
    }

    deleteTenant = () => {
        const index = this.state.index
        this.props.deleteTenant(index)
        this.setState({
            isTenantDetailsOpen: false
        })
        console.log(index)
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
        const tenantsList = this.props.allTenants.map(tenant => {
            return (
                <div>
                    <ListGroup.Item action onClick={() => this.showDetails(tenant)} className="tenants-list">
                    {tenant.name}</ListGroup.Item>
                    <div className={(this.state.isTenantDetailsOpen && this.state.index === this.props.allTenants.indexOf(tenant)) ? "tenant-details" : "close"}>
                        <div>{`Name: ${this.state.name}`}</div>
                        <div>{`Email: ${this.state.email}`}</div>
                        <div>{`Apt: ${this.state.apt}`}</div>
                        <div className="tenant-changes-btn">
                            <Button>Update</Button>
                            <Button onClick={this.deleteTenant} variant="danger">Delete</Button>
                        </div>
                    </div>
                </div>
            )
        })
        
        return(
            <Container className="p-tenants">
                <Form className="tenant-filter-box">
                    <button disabled className="tenant-filter-button"><img src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png"/></button>
                    <Form.Control onChange={this.filterTenants} value={this.state.filterInput} className="tenant-search-input" type="text" placeholder="Filter"/>
                </Form>
                <Button onClick={this.openModal} className="add-tenant-btn" type="button">
                    Add Tenant
                </Button>
                <Modal.Dialog className={this.state.isModalOpen ? "add-tenant-modal" : "close"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new tenant</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form>
                        <Form.Group >
                            <Form.Label>Full name</Form.Label>
                            <Form.Control name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" onChange={this.handleChange} value={this.state.email} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="pwd" onChange={this.handleChange} value={this.state.pwd} type="text" placeholder="Choose password" />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Apartment</Form.Label>
                            <Form.Control name="apt" onChange={this.handleChange} value={this.state.apt} type="text" placeholder="#apt" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Committee member" />
                        </Form.Group>
                    </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeModal} variant="secondary">Close</Button>
                        <Button variant="primary" onClick={this.addTanent}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                <ListGroup >
                    {tenantsList}
                </ListGroup>
                </Container>
        )
    }
}

export default Tenants;