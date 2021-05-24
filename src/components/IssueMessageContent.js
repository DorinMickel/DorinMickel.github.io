import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import "./components.css"
import UpdateModal from './UpdateModal';


class IssueMessageContent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            // isUpdateModalOpen: false,
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

    // openUpdateModal = () => {
    //     const openModal = {...this.state.isUpdateModalOpen}
    //     this.setState({
    //         isUpdateModalOpen: true
    //     })
    //     return openModal
    // }

    updateItem = () => {
        this.props.openUpdateModal(true)
    }

    render(){ 
        const priorityArr = ["Normal", "Important","Urgent"]
        const ativeUserCopy = {...this.props.activeUser}        
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
                        <p className="p-0">{priorityArr[this.props.selectedItem.priority]}</p>
                    </div>
                    {((this.props.IssueUpdateDeleteBtn && (this.props.selectedItem.userId===ativeUserCopy.userId)) ||
                    (ativeUserCopy.isCommitteeMember && this.props.MessagesUpdateDeleteBtn)) ? 
                    <div className="align-self-end mt-auto ">
                        <Button onClick={this.updateItem} type="button">Update</Button>
                        <Button onClick={this.deleteItem} className="ml-1" variant="danger">{this.props.deleteBtnText}</Button>
                    </div> : null}
                    {/* <UpdateModal
                        isUpdateModalOpen={this.state.isUpdateModalOpen}
                        UpdateModalTitle={this.props.UpdateModalTitle}/> */}
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
                    
                </div>
            </div>
        )

    }
}

export default IssueMessageContent;