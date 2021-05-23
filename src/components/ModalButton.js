import React from 'react';
import { Button } from 'react-bootstrap';
import './components.css'


class ModalButton extends React.Component {
    constructor(props){
        super(props);
        
    }
    
    

    render(){
        return(
            <div className="c-modal-btn">
                <Button onClick={() => this.props.openModal(true)}  type="button">
                    {this.props.buttonText}
                </Button>
            </div>
        )
    }
}

export default ModalButton;