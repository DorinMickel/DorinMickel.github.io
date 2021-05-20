import React from 'react';
import { Button, Col, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import "./components.css"


class IssuesList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isIssueOpen: false,
            index: -1,   
        }
    }

    showIssue = (issue) => {
        this.setState({
            isIssueOpen: ! this.state.isissueOpen,
            index: this.props.allIssues.indexOf(issue),
        })
        console.log(this.state.index)
    }

    render(){
        const issuesList = this.props.allIssues.map(issue => {
            return <div>
            <ListGroup.Item className="issues-list-items" onClick={() => this.showIssue(issue)}>{issue.title}</ListGroup.Item>
            <div className={(this.state.isIssueOpen && this.state.index === this.props.allIssues.indexOf(issue)) ? "issue-details" : "close"}>
                <div className="issue-img">
                <img src={issue.imgSrc}/> 
                </div>
                <div className="issue-info">
                    <div className="d-flex" >
                        <label className="mr-2 p-0">Details:</label>
                        <p className=" p-0">{issue.details}</p>
                    </div>
                    <div className="d-flex " >
                        <label className="mr-2 p-0">Priority:</label>
                        <p className="p-0">{issue.priority}</p>
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
        </div>
        })
        return issuesList
    }
}

export default IssuesList;