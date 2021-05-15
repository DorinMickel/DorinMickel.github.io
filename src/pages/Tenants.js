import React from 'react';
import { Form } from 'react-bootstrap';
import './pages.css'

class Tenants extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Form className="tenant-filter-box">
                    <button className="tenant-filter-button"><img src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png"/></button>
                    <Form.Control className="tenant-search-input" type="text" placeholder="Filter"/>
                </Form>
            </div>
        )
    }
}

export default Tenants;