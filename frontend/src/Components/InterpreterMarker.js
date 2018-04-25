import React, {Component} from 'react';
import {greatPlaceStyle, greatPlaceStyleHover} from '../Screens/hoverStyles.js';

export default class InterpreterMarker extends Component {
    constructor(props){
        super(props);
    }

    // onclick function will push to search page and the search page will check to see if the this.props.interpreter
    // field is null after the axios request. If it is then it sets the state of the value that dictates what interpreter is chosen and
    //provides some cue(such as filling out the textbox or dropdown menue for choice) that the interpreter has been chosen
    render() {
        console.log(this.props);
        const style = this.props.hover ? greatPlaceStyleHover : greatPlaceStyle;
        return(
            <div style={{width:40, height:40, backgroundColor:'white', cursor:'pointer', borderRadius:40, textAlign:'center'}}
                 onClick={(e)=>{
                     e.preventDefault();
                     this.props.getUserInfo(this.props.username)}}>
                <div>
                    <img src="http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-Picture.png" style={{height:'30px', width:'30px'}}/>
                </div>
            </div>
        );
    }
}
