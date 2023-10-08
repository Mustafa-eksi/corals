import React, { Component } from 'react'

class ButtonsOverlay extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={{position: "absolute", width:'100%', height:'100%'}}>
<button id="overlay_button" style={{position: "absolute", left: '4.5%'}} onClick={()=>{this.props.changeState()}}>deneme</button>
            </div>
        );
    }
}

export default ButtonsOverlay;