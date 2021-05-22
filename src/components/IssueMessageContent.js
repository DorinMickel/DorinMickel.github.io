import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import "./components.css"


class IssueMessageContent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    deleteItem = () => {
        const index = this.props.selectedIndex
        this.props.removeItem(index)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addComment = () => {
        this.props.addNewComment(this.state.comment)
        this.setState({
            comment: ''
        })
    }

    showComment = () => {
        const allComments = this.props.selectedItem.comments
        console.log(allComments)
        // .map(comment => {
        //     return (<div>
        //             {this.props.activeUser.name}: {comment}
        //         </div>)
        // })
        // return allComments
    }

    render(){ 
        // const comments = this.props.allIssues[this.props.selectedIndex]
        // console.log(comments)
        // .map( comment => {
        //     return (<div>
        //         {this.props.activeUser.name}: {comment}
        //     </div>)
        // })
        return(
            <div className={(this.props.isOpen && this.props.index === this.props.selectedIndex) ? "issue-details" : "close"}>
                <div className="issue-img">
                <img src={this.props.selectedItem.imgSrc}/> 
                </div>
                <div className="issue-info">
                    <div className="d-flex" >
                        <label className="mr-2 p-0">Details:</label>
                        <p className=" p-0">{this.props.selectedItem.details}</p>
                    </div>
                    <div className="d-flex " >
                        <label className="mr-2 p-0">Priority:</label>
                        <p className="p-0">{this.props.selectedItem.priority}</p>
                    </div>
                </div>
                <div className="flex-fill members-comments">
                    <Form.Group as={Row}>
                    <Form.Label column >Comments:</Form.Label>
                    <div>
                    {this.props.selectedItem.comments.join("....")}
                    </div>
                    <div>
                        {this.props.isOpen ? this.showComment() : null}
                    </div>
                    <Col sm={15}>
                        <Form.Control name="comment" onChange={this.handleChange} value={this.state.comment} as="textarea" lg={6} rows={3} />
                    </Col>
                    </Form.Group>
                </div>
                <div className="issue-details-btn">
                    <Button onClick={this.addComment} type="button">Add Comment</Button>
                    <Button onClick={this.deleteItem} variant="danger">Delete</Button>
                </div>
            </div>
        )

    }
}

export default IssueMessageContent;