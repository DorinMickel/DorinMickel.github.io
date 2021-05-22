import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import IssueMessageContent from '../components/IssueMessageContent';
import NewIssueModal from '../components/NewIssueModal';
import { withRouter } from "react-router-dom"
import './pages.css'
import FilterSortBar from '../components/FilterSortBar';


class Issues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedIndex: -1,
            selectedItem: {},
            filterOption: ''
        }
    }

    showIssue = (issue, index) => {
        this.setState({
            isOpen: !this.state.isOpen,
            selectedIndex: index,
            selectedItem: { ...issue }
        })
    }

    filterIssues = (option) => {
        this.setState({
            filterOption: option
        })
    }

    addNewComment = (newComment) => {
        this.state.selectedItem.comments.push(newComment)
        this.props.addIssueComment(this.state.selectedItem.comments, this.state.selectedIndex)
    }

    render() {
        const issuesList = this.props.allIssues.filter(issue => {
            return (issue.priority === this.state.filterOption || this.state.filterOption === '')
            }).map((issue, index) => {
                return (
                    <div key={index}>
                        <ListGroup.Item className="issues-list-items" onClick={() => this.showIssue(issue, index)}>{issue.title}</ListGroup.Item>
                        <IssueMessageContent
                            allIssues={this.props.allIssues}
                            isOpen={this.state.isOpen}
                            index={index}
                            selectedIndex={this.state.selectedIndex}
                            selectedItem={this.state.selectedItem}
                            removeItem={this.props.removeIssue}
                            addNewComment={this.addNewComment}
                            activeUser={this.props.activeUser}
                        />
                    </div>
                )
        })
        return (
            <Container className="p-issues">
                <FilterSortBar
                    priorityOptions={[
                        <option value="normal">Normal</option>,
                        <option value="important">Important</option>,
                        <option value="urgent">Urgent</option>]}
                    filterIssues={this.filterIssues}
                        />
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
                    createBtnText={`Report`}
                    />}
                {issuesList}
            </Container>
        )
    }
}

export default withRouter(Issues);