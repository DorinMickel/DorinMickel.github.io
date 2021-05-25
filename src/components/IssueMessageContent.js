import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import "./components.css"



class IssueMessageContent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isUpdateModalOpen: false,
            index: -1,
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

    openUpdateIssueModal = () => {
        const selectedItemCopy = {...this.props.selectedItem}
        const priorityArr = ["Normal", "Important","Urgent"]
        this.setState({
            isUpdateModalOpen: true,
            title: selectedItemCopy.title,
            details: selectedItemCopy.details,
            priority: priorityArr[selectedItemCopy.priority],
            imgSrc: selectedItemCopy.imgSrc,
            index: this.props.selectedIndex
        })
    }

    openUpdateMessageModal = () => {
        const selectedItemCopy = {...this.props.selectedItem}
        this.setState({
            isUpdateModalOpen: true,
            title: selectedItemCopy.title,
            details: selectedItemCopy.details,
            priority: selectedItemCopy.priority,
            imgSrc: selectedItemCopy.imgSrc,
            index: this.props.selectedIndex
        })
    }

    closeModal = () => {
        this.setState({
            isUpdateModalOpen: false,
        })
    }

    editItemDetails = () => {
        const updatedItemObj = {
            title: this.state.title,
            details: this.state.details,
            priority: this.state.priority,
            imgSrc: this.state.imgSrc,
            index: this.state.index
        }
        this.props.updateItemDetails(updatedItemObj)
        this.props.closeContent(false)
        this.closeModal()
    }

    render(){ 
        console.log(this.props.selectedItem)
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
                        <p className="p-0">{(this.props.IssueUpdateDeleteBtn) ? priorityArr[this.props.selectedItem.priority] : this.props.selectedItem.priority}</p>
                    </div>
                    {((this.props.IssueUpdateDeleteBtn && (this.props.selectedItem.userId===ativeUserCopy.userId)) ||
                    (ativeUserCopy.isCommitteeMember && this.props.MessagesUpdateDeleteBtn)) ? 
                    <div className="align-self-end mt-auto ">
                        <Button onClick={(this.props.IssueUpdateDeleteBtn) ? this.openUpdateIssueModal : this.openUpdateMessageModal}
                         type="button">Update</Button>
                        <Button onClick={this.deleteItem} className="ml-1" variant="danger">{this.props.deleteBtnText}</Button>
                    </div> : null}
                    <div className="c-new-issue-modal">
                        <Modal.Dialog 
                        size="lg"
                        aria-labelledby="example-modal-sizes-title-lg"
                        className={this.state.isUpdateModalOpen ? "new-issue-modal" : "close"}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.props.UpdateModalTitle}</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                            <Form >
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}>Title: </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control name="title" onChange={this.handleChange} value={this.state.title} required type="text"  />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}>Details</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control name="details" onChange={this.handleChange} value={this.state.details} required as="textarea" rows={3} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                                    <Form.Label column sm={2}>Priority</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control name="priority" onChange={this.handleChange} value={this.state.priority} as="select">
                                            {this.props.priorityOptions}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}>image URL:</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control name="imgSrc" onChange={this.handleChange} value={this.state.imgSrc} type="text" />
                                        <img src=""/>
                                    </Col>
                                </Form.Group>
                            </Form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={this.closeModal} variant="secondary">Close</Button>
                                <Button onClick={this.editItemDetails} variant="primary" >Save Changes</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
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