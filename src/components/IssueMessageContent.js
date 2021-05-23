import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import "./components.css"


class IssueMessageContent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    deleteItem = () => {
        const index = this.props.selectedIndex
        this.props.removeItem(index)
        this.props.deletedItem(false)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addComment = () => {
        this.props.addNewComment(this.state.comment)
        this.setState({
            comment: ''
        })
    }

    render(){ 
        const activeUserCopy = {...this.props.activeUser}
        const comments = this.props.selectedItem.comments.map( comment => {
            return (<div className="d-flex">
                <div>{activeUserCopy.name}</div>: <div className="comment-content ml-2">{comment}</div>
            </div>)
        })
        return(
            <div className={(this.props.isOpen && this.props.index === this.props.selectedIndex) ? "issue-details" : "close"}>
                <div className="issue-img">
                <img src={this.props.selectedItem.imgSrc}/> 
                </div>
                <div className="d-flex pb-0 flex-column issue-info">
                    <div className="d-flex" >
                        <label className="mr-2 p-0">Details:</label>
                        <p className=" p-0">{this.props.selectedItem.details}</p>
                    </div>
                    <div className="d-flex " >
                        <label className="mr-2 p-0">Priority:</label>
                        <p className="p-0">{this.props.selectedItem.priority}</p>
                    </div>
                    <Button className="align-self-end justify-self-end" onClick={this.updaste} type="button">Update</Button>
                </div>
                <div className="flex-fill members-comments">
                    <Form.Group as={Row}>
                    <Form.Label column >Comments:</Form.Label>
                    <div>
                        {comments}
                    </div>
                    <Col sm={15}>
                        <Form.Control name="comment" onChange={this.handleChange} value={this.state.comment} as="textarea" lg={6} rows={3} />
                    </Col>
                    </Form.Group>
                    
                </div>
                <div className="issue-details-btn">
                    <Button onClick={this.addComment} type="button">Add Comment</Button>
                    <Button onClick={this.deleteItem} variant="danger">Delete</Button>
                </div>
            </div>
        )

    }
}

export default IssueMessageContent;