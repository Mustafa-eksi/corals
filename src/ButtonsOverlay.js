import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

class ButtonsOverlay extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={{position: "absolute", width:'100%', height:'100%'}}>
                <Button variant="danger" id="overlay_button" style={{position: "absolute", left: '50%', top: '5%', fontSize: '9pt'}} onClick={()=>{this.props.changeState(2)}}>Arctic Ocean</Button>
                <Button variant="danger" id="overlay_button" style={{position: "absolute", left: '13%', top: '35%', fontSize: '9pt'}} onClick={()=>{this.props.changeState(1)}}>Vaquita dolphin</Button>
                <Button variant="danger" id="overlay_button" style={{position: "absolute", left: '31%', top: '30%', fontSize: '9pt'}} onClick={()=>{this.props.changeState(2)}}>North Atlantic Right Whale</Button>
                <Button variant="danger" id="overlay_button" style={{position: "absolute", left: '80%', top: '37%', fontSize: '9pt'}} onClick={()=>{this.props.changeState(2)}}>Indian Ocean</Button>
                <Button variant="light" id="overlay_button" style={{position: "absolute", left: '47%', top: '   ', fontSize: '9pt'}} onClick={()=>{this.props.changeState(2)}}>Dugong</Button>
            </div>
        );
    }
}

export default ButtonsOverlay;