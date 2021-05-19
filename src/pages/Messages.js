import React from 'react';
import { Button, Col, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import './pages.css'


class Messages extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false,
            isMessageOpen: false,
            index: -1,
            title: '',
            details: '',
            priority: 'info',
            imgSrc: ''
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
    openMessage = (message) => {
        this.setState({
            isMessageOpen: ! this.state.isMessageOpen,
            index: this.props.allMessages.indexOf(message),
        })
    }
    newMessage = () => {
        const newMessageObj = {
            title: this.state.title,
            details: this.state.details,
            priority: this.state.priority,
            imgSrc: this.state.imgSrc
        }
        this.closeModal()
        this.props.createNewMessage(newMessageObj)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target)
    }
    render(){
        const messagesList = this.props.allMessages.map(message => {
            return (
                <div>
                    <ListGroup.Item className="messages-list-items" onClick={() => this.openMessage(message)}>{message.title}</ListGroup.Item>
                    <div className={this.state.isMessageOpen && this.state.index === this.props.allMessages.indexOf(message) ? "message-details" : "close"}>
                       <div className="message-img">
                        <img src={message.imgSrc}/> 
                       </div>
                       <div className="message-info">
                            <div className="d-flex" >
                                <label className="col-2 p-0">Details:</label>
                                <p >{message.details}</p>
                            </div>
                            <div className="d-flex" >
                                <label >Priority:</label>
                                <p >{message.priority}</p>
                            </div>
                        </div>
                        <div className="flex-fill tenants-comments">
                            <Form.Group as={Row}>
                            <Form.Label column >Comments:</Form.Label>
                            <Col sm={15}>
                                <Form.Control as="textarea" lg={6} rows={3} />
                            </Col>
                            </Form.Group>
                        </div>
                        <div className="message-details-btn">
                            <Button>Update</Button>
                            <Button variant="danger">Delete</Button>
                        </div>
                    </div>
                </div>
                )
        })
        return(
            <Container className="p-messages">
                <Form className="messages-filter-sort">
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
                <Modal.Dialog 
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
                className={this.state.isModalOpen ? "new-message-modal" : "close"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Write new message</Modal.Title>
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
                                <option>Info</option>
                                <option>Important!</option>
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
                        <Button onClick={this.newMessage} variant="primary" >Create</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                <ListGroup className="messages-list">
                    {messagesList}                    
                </ListGroup>
            </Container>
        )
    }
}

export default Messages;