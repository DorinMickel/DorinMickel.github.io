import React from 'react';
import { Form } from 'react-bootstrap';

class Tenants extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control className="search-input" type="text" placeholder="Filter" />
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default Tenants;