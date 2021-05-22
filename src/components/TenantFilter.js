import React from 'react';
import {  Form } from 'react-bootstrap';
import './components.css'


class TenantsFilter extends React.Component {
    constructor(props){
        super(props);
        // this.state = {
        //     filterInput: ''
        // }
    }

    filterTenants = (event) => {
        // this.setState({
        //     filterInput: event.target.value
        // })
        this.props.filteredTenants(event.target.value)
        console.log(event.target.value)
    }
    
    render(){
        return (
            <Form className="tenant-filter-box">
                <button disabled className="tenant-filter-button"><img src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png"/></button>
                <Form.Control onChange={this.filterTenants} className="tenant-search-input" type="text" placeholder="Filter"/>
            </Form>
        )
    }
}

export default TenantsFilter;
