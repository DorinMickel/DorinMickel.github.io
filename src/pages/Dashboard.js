import React from 'react';
import { Container } from 'react-bootstrap';
import {withRouter} from "react-router-dom"


class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container>
               {this.props.children}
            </Container>
        )
    }
}

export default  withRouter(Dashboard);