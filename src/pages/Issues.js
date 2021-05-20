import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import IssuesList from '../components/IssuesList';
import NewIssueModal from '../components/NewIssueModal';
import { withRouter } from "react-router-dom"
import './pages.css'


class Issues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isIssueOpen: false,
            selectedIndex: -1,
            selectedIssue: {}
        }
    }

    showIssue = (issue, index) => {
        this.setState({
            isIssueOpen: !this.state.isIssueOpen,
            selectedIndex: index,
            selectedIssue: { ...issue }
        })
    }

    render() {

        console.log(this.props.location.pathname, "location");
        const issuesList = this.props.allIssues.map((issue, index) => {
            return (
                <div key={index}>
                    <ListGroup.Item className="issues-list-items" onClick={() => this.showIssue(issue, index)}>{issue.title}</ListGroup.Item>
                    <IssuesList
                        allIssues={this.props.allIssues}
                        isIssueOpen={this.state.isIssueOpen}
                        index={index}
                        selectedIndex={this.state.selectedIndex}
                        selectedIssue={this.state.selectedIssue}
                    />
                </div>
            )
        })
        return (
            <Container className="p-issues">
                {this.props.location.pathname === "/issues" && <NewIssueModal reportNewIssue={this.props.reportNewIssue} />}
                {issuesList}
            </Container>
        )
    }
}

export default withRouter(Issues);