import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import "./components.css"


class IssuesList extends React.Component {
    constructor(props){
        super(props);
        this.state={
  
        }
    }

    render(){
        return(
            <div className={(this.props.isIssueOpen && this.props.index === this.props.selectedIndex) ? "issue-details" : "close"}>
                <div className="issue-img">
                <img src={this.props.selectedIssue.imgSrc}/> 
                </div>
                <div className="issue-info">
                    <div className="d-flex" >
                        <label className="mr-2 p-0">Details:</label>
                        <p className=" p-0">{this.props.selectedIssue.details}</p>
                    </div>
                    <div className="d-flex " >
                        <label className="mr-2 p-0">Priority:</label>
                        <p className="p-0">{this.props.selectedIssue.priority}</p>
                    </div>
                </div>
                <div className="flex-fill members-comments">
                    <Form.Group as={Row}>
                    <Form.Label column >Comments:</Form.Label>
                    <Col sm={15}>
                        <Form.Control as="textarea" lg={6} rows={3} />
                    </Col>
                    </Form.Group>
                </div>
                <div className="issue-details-btn">
                    <Button>Update</Button>
                    <Button variant="danger">Delete</Button>
                </div>
            </div>
        )

    }
}

export default IssuesList;