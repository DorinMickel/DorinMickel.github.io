import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import "./components.css"


class IssueMessageContent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    deleteItem = (deletedItem) => {
        const index = this.props.selectedIndex
        this.props.removeItem(index)
    }

    render(){
        return(
            <div className={(this.props.isOpen && this.props.index === this.props.selectedIndex) ? "issue-details" : "close"}>
                <div className="issue-img">
                <img src={this.props.selectedItem.imgSrc}/> 
                </div>
                <div className="issue-info">
                    <div className="d-flex" >
                        <label className="mr-2 p-0">Details:</label>
                        <p className=" p-0">{this.props.selectedItem.details}</p>
                    </div>
                    <div className="d-flex " >
                        <label className="mr-2 p-0">Priority:</label>
                        <p className="p-0">{this.props.selectedItem.priority}</p>
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
                    <Button>Add Comment</Button>
                    <Button onClick={this.deleteItem} variant="danger">Delete</Button>
                </div>
            </div>
        )

    }
}

export default IssueMessageContent;