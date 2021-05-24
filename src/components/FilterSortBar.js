import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import './components.css'


class FilterSortBar extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            item: '',
            
        }
    }
    
    filterByPriority = (event) => {
        const value = event.target.value
        if(this.props.filterIssues){
            this.props.filterIssues(value)
        }
        else{
            this.props.filterMessages(value)
        }
    }

    searchWithText = (event) => {
        const val = event.target.value
        if(this.props.searchIssues){
            this.props.searchIssues(val)
        }
        else {
            this.props.searchMessage(val)
        }
    }

    render(){
        return(
                <Form className="messages-filter-sort">
                    <Form.Row className="justify-content-around">
                        <Form.Group as={Col} sm={6}>
                            <button disabled className="tenant-filter-button"><img src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png"/></button>
                            <Form.Control onChange={this.searchWithText} className="message-filter-input" type="text" placeholder="Search"/>
                        </Form.Group>
                        <Form.Group as={Col} sm={3} controlId="formGridState">
                            
                            <Form.Control onChange={this.filterByPriority} as="select" defaultValue="Filter by priority">
                                <option value="">Filter by priority</option>
                                {this.props.priorityOptions}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Row} sm={3}>
                        <Form.Label as="legend" column >
                            Sort By:
                        </Form.Label>
                                <Form.Check className="align-self-center"
                                type="radio"
                                label="Date"
                                />
                                <Form.Check className="align-self-center"
                                type="radio"
                                label="Priority"
                                />
                        </Form.Group>
                    </Form.Row>
                </Form>
        )
    }
}

export default FilterSortBar;