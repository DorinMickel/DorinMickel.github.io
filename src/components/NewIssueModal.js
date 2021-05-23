import React from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import './components.css'
import ModalButton from './ModalButton';
import { v4 as uuidv4 } from 'uuid';
import Moment from 'react-moment';


class NewIssueModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false,
            validated: false, 
            setValidated: false,
            
        }
    }
    
    openModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        })
    }

    addNewItem = () => {
        const date = new Date();
        const newItemObj = {
            id: uuidv4(),
            userId: this.props.activeUser.userId,
            title: this.state.title,
            details: this.state.details,
            priority: this.state.priority,
            imgSrc: this.state.imgSrc,
            comments: [],
            date: date
        }
        this.props.createNewItem(newItemObj)
        this.closeModal()
        this.setState({
            title: '',
            details: '',
            priority: this.props.priority,
            imgSrc: '',
        })
    }

    

    render(){
        
        return(
            <div className="c-new-issue-modal">
                <ModalButton
                    openModal={this.openModal}
                    buttonText={this.props.buttonText}/>
                <Modal.Dialog 
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
                className={this.state.isModalOpen ? "new-issue-modal" : "close"}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.modalTitle}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form noValidate validated={this.validated} onSubmit={this.handleSubmit}>
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
                        <Button onClick={this.addNewItem} variant="primary" >{this.props.createBtnText}</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}

export default NewIssueModal;