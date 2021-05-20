import React from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import './components.css'
import ModalButton from './ModalButton';


class NewIssueModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
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

    closeModal =() => {
        this.setState({
            isModalOpen: false
        })
    }

    newIssue = () => {

    }

    render(){
        
        return(
            <div className="c-new-issue-modal">
                <ModalButton
                openModal={this.openModal}/>
                <Modal.Dialog 
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
                className={this.state.isModalOpen ? "new-issue-modal" : "close"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Elaborate the issue</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Title: </Form.Label>
                            <Col sm={10}>
                                <Form.Control name="title" onChange={this.handleChange} value={this.state.title} type="text"  />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Details</Form.Label>
                            <Col sm={10}>
                                <Form.Control name="details" onChange={this.handleChange} value={this.state.details} as="textarea" rows={3} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                            <Form.Label column sm={2}>Priority</Form.Label>
                            <Col sm={10}>
                                <Form.Control name="priority" onChange={this.handleChange} value={this.state.priority} as="select">
                                <option>Urgent</option>
                                <option>Important</option>
                                <option>Normal</option>
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
                        <Button onClick={this.newIssue} variant="primary" >Report</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}

export default NewIssueModal;