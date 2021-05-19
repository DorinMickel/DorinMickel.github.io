import React from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import './pages.css'


class Messages extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
    }
    openModal = () => {
        this.setState({
            isModalOpen:true
        })
    }
    closeModal = () => {
        this.setState({
            isModalOpen:false
        })
    }
    render(){
        return(
            <Container className="p-messages">
                <Form >
                    <Form.Row className="justify-content-around">
                        <Form.Group as={Col} sm={6}>
                            <button disabled className="tenant-filter-button"><img src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png"/></button>
                            <Form.Control  className="message-filter-input" type="text" placeholder="Filter"/>
                        </Form.Group>
                        <Form.Group as={Col} sm={3} controlId="formGridState">
                            
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
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
                <Button onClick={this.openModal} className="new-message-btn" type="button">
                    New Message
                </Button>
                <Modal.Dialog className={this.state.isModalOpen ? "add-tenant-modal" : "close"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new tenant</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Title: </Form.Label>
                            <Col sm={10}>
                                <Form.Control  type="text"  />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Details</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="textarea" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                            <Form.Label column sm={2}>Example select</Form.Label>
                            <Col sm={10}>
                                <Form.Control as="select">
                                <option>Info</option>
                                <option>Important!</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>image URL:</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" />
                                <img src=""/>
                            </Col>
                        </Form.Group>
                    </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeModal} variant="secondary">Close</Button>
                        <Button variant="primary" >Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Container>
        )
    }
}

export default Messages;