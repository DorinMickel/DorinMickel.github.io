import React from 'react';
import { Button, Container, Form, ListGroup } from 'react-bootstrap';
import './pages.css'

class Tenants extends React.Component{
    constructor(props){
        super(props);
        this.state={
            index: -1,
            name: '',
            email: '',
            apt: '',
            isTenantDetailsOpen: false
        }
    }
    showDetails = (tenantObj) => {
        // this.setState({
        //     name: this.props.allTanents.index.name,
        //     email: this.props.allTanents.index.email,
        //     apt: this.props.allTanents.index.apt,
        // })
        
        const index = this.props.allTanents.indexOf(tenantObj)
        this.setState({
            index: index,
            name: tenantObj.name,
            email: tenantObj.email,
            apt: tenantObj.apt,
            isTenantDetailsOpen: ! this.state.isTenantDetailsOpen
        })
    }

    render(){
        const tenantsList = this.props.allTanents.map(tenant => {
            return (<ListGroup.Item action onClick={() => this.showDetails(tenant)} className="tenants-list">
                {tenant.name}
                <div className={(this.state.isTenantDetailsOpen && this.state.index === this.props.allTanents.indexOf(tenant)) ? "tenant-details" : "close-tenant-details"}>
                        <div>{`Name: ${this.state.name}`}</div>
                        <div>{`Email: ${this.state.email}`}</div>
                        <div>{`Apt: ${this.state.apt}`}</div>
                        <div className="tenant-changes-btn">
                            <Button>Update</Button>
                            <Button variant="danger">Delete</Button>
                        </div>
                </div>
            </ListGroup.Item>)
        })
        
        return(
            <Container className="p-tenants">
                <Form className="tenant-filter-box">
                    <button className="tenant-filter-button"><img src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png"/></button>
                    <Form.Control className="tenant-search-input" type="text" placeholder="Filter"/>
                </Form>
                <Button className="add-tenant-btn" type="button">
                    Add Tenant
                </Button>
                <ListGroup >
                    {tenantsList}
                </ListGroup>
                </Container>
        )
    }
}

export default Tenants;