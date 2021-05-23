import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import IssueMessageContent from '../components/IssueMessageContent';
import NewIssueModal from '../components/NewIssueModal';
import { withRouter } from "react-router-dom"
import './pages.css'
import FilterSortBar from '../components/FilterSortBar';
import Moment from 'react-moment';


class Issues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedIndex: -1,
            selectedItem: {
                comments:[]
            },
            filterOption: '',
            priority: "normal"
        }
    }

    showIssue = (issue, index) => {
        const test = index
        this.setState({
            isOpen: !this.state.isOpen,
            selectedIndex: test,
            selectedItem: { ...issue }
        })
    }

    deletedItem = (close) => {
        this.setState({
            isOpen: close,
        })
    }

    filterIssues = (option) => {
        this.setState({
            filterOption: option
        })
    }

    addNewComment = (newComment) => {
        const commentsCopy = [...this.state.selectedItem.comments].concat(newComment);
        const selectedCopy = {...this.state.selectedItem, comments: commentsCopy}
        this.setState({
            selectedItem: selectedCopy
        })
        this.props.addIssueComment(commentsCopy, this.state.selectedIndex)
    }

    render() {
        const date = new Date();
        const issuesList = this.props.allIssues.filter(issue => {
            return (issue.priority === this.state.filterOption || this.state.filterOption === '')
            }).map((issue, index) => {
                return (
                    <div key={index}>
                        <ListGroup.Item className="d-flex justify-content-between issues-list-items" onClick={() => this.showIssue(issue, index)}>
                            <div>{issue.title}</div> 
                            <div >Issued on: <Moment fromDate format="DD-MM-YYYY">{issue.date}</Moment></div>
                            </ListGroup.Item>
                        <IssueMessageContent
                            allIssues={this.props.allIssues}
                            isOpen={this.state.isOpen}
                            index={index}
                            selectedIndex={this.state.selectedIndex}
                            selectedItem={this.state.selectedItem}
                            removeItem={this.props.removeIssue}
                            deletedItem={this.deletedItem}
                            addNewComment={this.addNewComment}
                            activeUser={this.props.activeUser}
                            deleteBtnText="Resolve Issue"
                        />
                    </div>
                )
        })
        return (
            <Container className="p-issues">
                {this.props.location.pathname === "/issues" && 
                <FilterSortBar
                    priorityOptions={[
                        <option value="normal">Normal</option>,
                        <option value="important">Important</option>,
                        <option value="urgent">Urgent</option>]}
                    filterIssues={this.filterIssues}
                        />
                }
                {this.props.location.pathname === "/issues" && 
                <NewIssueModal 
                    createNewItem={this.props.createNewItem} 
                    activeUser={this.props.activeUser}
                    buttonText={`Report an issue`}
                    modalTitle={`Elaborate the issue`}
                    priorityOptions={[
                        <option value="normal">Normal</option>,
                        <option value="important">Important</option>,
                        <option value="urgent">Urgent</option>]}
                    priority={this.state.priority}
                    createBtnText={`Report`}
                    
                    />}
                {issuesList}
            </Container>
        )
    }
}

export default withRouter(Issues);