import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import "./components.css"
import UpdateModal from './UpdateModal';


class IssueMessageContent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isUpdateModalOpen: false,
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
        const newComment = {
            userName: this.props.activeUser.name,
            comment: this.state.comment
        }
        this.props.addNewComment(newComment)
        this.setState({
            comment: ''
        })
    }

    

    render(){ 
        const itemComments = this.props.selectedItem.comments.map( comment => {
            return (<div className="d-flex">
                <div>{comment.userName}</div>: 
                <div className="comment-content ml-2">{comment.comment}</div>
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
                    <div className="align-self-end mt-auto ">
                        <Button onClick={() => this.props.openUpdateModal(true)} type="button">Update</Button>
                        <Button className="ml-1" variant="danger">{this.props.deleteBtnText}</Button>
                    </div>
                    <UpdateModal/>
                </div>
                <div className="flex-fill members-comments">
                    <Form.Group as={Row}>
                    <Form.Label column >Comments:</Form.Label>
                    <div>
                        {itemComments}
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