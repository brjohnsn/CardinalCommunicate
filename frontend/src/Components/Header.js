import React, {Component} from 'react';

export default class Header extends Component{
    render(){
        const style = {backgroundColor: 'rgb(250,80,70)', height: '80px', textAlign: 'center', color: 'white', fontSize: '20px', paddingTop: '0.001%'}
        return(
            <div style = {style}>
                <h1>Cardinal Communicate</h1>
            </div>
        );
    }
}