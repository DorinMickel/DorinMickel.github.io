import React from 'react';
import { Button, Col, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import FilterSortBar from '../components/FilterSortBar';
import IssueMessageContent from '../components/IssueMessageContent';
import NewIssueModal from '../components/NewIssueModal';
import './pages.css'


class Messages extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false,
            isOpen: false,
            selectedItem:{},
            index: -1,
            title: '',
            details: '',
            priority: 'info',
            imgSrc: '',
            filterOption: ''
        }
    }
    
    
    openMessage = (message, index) => {
        this.setState({
            isOpen: ! this.state.isOpen,
            selectedIndex: index,
            selectedItem: {...message}
        })
    }

    filterMessages = (option) => {
        this.setState({
            filterOption: option
        })
    }
    
    render(){
        const messagesList = this.props.allMessages.filter(message => {
            return(message.priority === this.state.filterOption || this.state.filterOption === '')
        }).map((message, index) => {
            return (
                <div>
                    <ListGroup.Item className="messages-list-items" onClick={() => this.openMessage(message, index)}>{message.title}</ListGroup.Item>
                    <IssueMessageContent
                        allMessages={this.props.allMessages}
                        isOpen={this.state.isOpen}
                        index={index}
                        selectedIndex={this.state.selectedIndex}
                        selectedItem={this.state.selectedItem}
                        removeItem={this.props.removeMessage}
                    />
                </div>
                )
        })
        return(
            <Container className="p-messages">
                <FilterSortBar
                    priorityOptions={[
                        <option value="info">Info</option>,
                        <option value="important">Important!</option>]}
                    allMessages={this.props.allMessages}
                    filterMessages={this.filterMessages}
                />
                                
                <NewIssueModal
                    createNewItem={this.props.createNewItem} 
                    activeUser={this.props.activeUser}
                    buttonText={`New Message`}
                    modalTitle={`Write a new message`}
                    priorityOptions={[
                        <option value="info">Info</option>,
                        <option value="important">Important!</option>]}
                    createBtnText={`Create`}
                    
                />
                
                <ListGroup className="messages-list">
                    {messagesList}                    
                </ListGroup>
            </Container>
        )
    }
}

export default Messages;