import React, {Component} from 'react';

export default class Header extends Component{
    render(){
        const style = {backgroundColor: 'red', height: '100px', textAlign: 'center', color: 'white'}
        return(
            <div style = {style}>
                <h1>Cardinal Communicate</h1>
            </div>
        );
    }
}