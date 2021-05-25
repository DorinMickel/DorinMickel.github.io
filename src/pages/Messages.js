import React from 'react';
import { Container, ListGroup, } from 'react-bootstrap';
import Moment from 'react-moment';
import { withRouter } from 'react-router';
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
            selectedItem:{
                comments: []
            },
            index: -1,
            title: '',
            details: '',
            priority: 'info',
            imgSrc: '',
            filterOption: '',
            searchText: '',
            isUpdateModalOpen: false
        }
    }
    
    
    openMessage = (message, index) => {
        this.setState({
            isOpen: ! this.state.isOpen,
            selectedIndex: index,
            selectedItem: {...message}
        })
    }

    addNewComment = (newComment) => {
        const commentsCopy = [...this.state.selectedItem.comments].concat(newComment);
        const selectedCopy = {...this.state.selectedItem, comments: commentsCopy}
        this.setState({
            selectedItem: selectedCopy
        })
        this.props.addMessageComment(commentsCopy, this.state.selectedIndex)
    }

    deletedItem = (close) => {
        this.setState({
            isOpen: close,
        })
    }

    filterMessages = (option) => {
        this.setState({
            filterOption: option
        })
    }

    searchMessage = (searchInput) => {
        this.setState({
            searchText: searchInput
        })
    }
    
    closeContent = (close) => {
        this.setState({
            isOpen: close,
        })
    }

    render(){
        const messagesList = this.props.allMessages.filter(message => {
            return((message.priority === this.state.filterOption || this.state.filterOption === '') &&
            (message.title.toLowerCase().includes(this.state.searchText.toLowerCase()) || message.title.toLowerCase().includes(this.state.searchText.toLowerCase())))
        }).map((message, index) => {
            return (
                <div>
                    <ListGroup.Item className="d-flex justify-content-between messages-list-items" onClick={() => this.openMessage(message, index)}>
                        <div>{message.title}</div> 
                        <div >Posted on: <Moment fromDate format="DD-MM-YYYY">{message.date}</Moment></div>
                        </ListGroup.Item>
                    <IssueMessageContent
                        allMessages={this.props.allMessages}
                        isOpen={this.state.isOpen}
                        index={index}
                        selectedIndex={this.state.selectedIndex}
                        selectedItem={this.state.selectedItem}
                        removeItem={this.props.removeMessage}
                        deletedItem={this.deletedItem}
                        addNewComment={this.addNewComment}
                        activeUser={this.props.activeUser}
                        deleteBtnText="Delete Message"
                        UpdateModalTitle="Update Message Details"
                        MessagesUpdateDeleteBtn={true}
                        //
                        closeContent={this.closeContent}
                            priorityOptions={[
                                <option value="info">Info</option>,
                                <option value="important">Important!</option>]}
                        updateItemDetails={this.props.updateItemDetails}
                    />
                </div>
                )
        }).reverse()
        return(
            <Container className="p-messages">
                {this.props.location.pathname === "/messages" &&
                <FilterSortBar
                    priorityOptions={[
                        <option value="info">Info</option>,
                        <option value="important">Important!</option>]}
                    allMessages={this.props.allMessages}
                    filterMessages={this.filterMessages}
                    searchMessage={this.searchMessage}
                />
                }   
                {this.props.location.pathname === "/messages" &&            
                <NewIssueModal
                    createNewItem={this.props.createNewItem} 
                    activeUser={this.props.activeUser}
                    buttonText={`New Message`}
                    modalTitle={`Write a new message`}
                    priorityOptions={[
                        <option value="info">Info</option>,
                        <option value="important">Important!</option>]}
                    createBtnText={`Create`}  
                    priority={this.state.priority}
                />
                }   
                <ListGroup className="messages-list">
                    {messagesList}                    
                </ListGroup>
            </Container>
        )
    }
}

export default withRouter(Messages);