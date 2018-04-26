import React, {Component} from 'react';
import {greatPlaceStyle, greatPlaceStyleHover} from '../Screens/hoverStyles';


export default class ClientMarker extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div style={{width:"20%", height:"20%"}}>
                <img src="https://cdn3.iconfinder.com/data/icons/map/500/pin-512.png" style={{height:'30px', width:'30px'}}/>
            </div>
        );
    }
}
