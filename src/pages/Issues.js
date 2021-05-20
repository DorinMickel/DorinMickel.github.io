import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import IssuesList from '../components/IssuesList';
import NewIssueModal from '../components/NewIssueModal';
import './pages.css'


class Issues extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isIssueOpen: false,
            index: -1, 
        }
    }
    
    showIssue = (issue) => {
        this.setState({
            isIssueOpen: ! this.state.isissueOpen,
            index: this.props.allIssues.indexOf(issue),
        })
        console.log(this.state.index)
    }

    render(){
        const issuesList = this.props.allIssues.map(issue => {
            return (
            <ListGroup.Item className="issues-list-items" onClick={ this.showIssue}>{issue.title}</ListGroup.Item>
        )})
        return(
            <Container className="p-issues">
                <NewIssueModal/>
                <IssuesList 
                allIssues={this.props.allIssues}
                showIssue={this.showIssue}
                />
            </Container>
        )
    }
}

export default Issues;