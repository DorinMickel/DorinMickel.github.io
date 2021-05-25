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
            searchText: '',
            prioritySort: false,
            //
            isUpdateModalOpen: false,
            priority: 0,
            title: '',
            details: '',
            imgSrc: '',

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

    searchIssues = (searchInput) => {
        this.setState({
            searchText: searchInput
        })
    }

    sortingByPriority = (options) => {
        this.setState({
            prioritySort: options
        })
    }

    //
    closeContent = (close) => {
        this.setState({
            isOpen: close,
        })
    }

    render() {
        const priorityArr = ["Normal", "Important","Urgent"]
        const activeUserCopy = {...this.props.activeUser}
        const date = new Date();
        const issuesList = this.props.allIssues.slice().sort((a, b) => {
            return ((this.state.prioritySort) ? a.priority - b.priority : 0)
            }).filter(issue => {
            return ((priorityArr[issue.priority] === this.state.filterOption || this.state.filterOption === '') && 
            (issue.title.toLowerCase().includes(this.state.searchText.toLowerCase()) || 
            issue.details.toLowerCase().includes(this.state.searchText.toLowerCase())))
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
                            activeUser={activeUserCopy}
                            deleteBtnText="Resolve Issue"
                            UpdateModalTitle="Update Issue Details"
                            IssueUpdateDeleteBtn={true}
                            //
                            closeContent={this.closeContent}
                            priorityOptions={[
                                <option value={0}>Normal</option>,
                                <option value={1}>Important</option>,
                                <option value={2}>Urgent</option>]}
                            updateItemDetails={this.props.updateItemDetails}
                        />
                    </div>
                )
        }).reverse()
        return (
            <Container className="p-issues">
                {this.props.location.pathname === "/issues" && 
                <FilterSortBar
                    priorityOptions={[
                        <option value="Normal">Normal</option>,
                        <option value="Important">Important</option>,
                        <option value="Urgent">Urgent</option>]}
                    filterIssues={this.filterIssues}
                    searchIssues={this.searchIssues}
                    IssuesSort={true}
                    sortingByPriority={this.sortingByPriority}
                        />
                }
                {this.props.location.pathname === "/issues" && 
                <NewIssueModal 
                    createNewItem={this.props.createNewItem} 
                    activeUser={this.props.activeUser}
                    buttonText={`Report an issue`}
                    modalTitle={`Elaborate the issue`}
                    priorityOptions={[
                        <option value={0}>Normal</option>,
                        <option value={1}>Important</option>,
                        <option value={2}>Urgent</option>]}
                    priority={this.state.priority}
                    createBtnText={`Report`}
                    tenantCreateIssue={true}
                    />}
                {issuesList}
            </Container>
        )
    }
}

export default withRouter(Issues);