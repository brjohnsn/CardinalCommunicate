import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class Search extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <div style = {{textAlign: 'center'}}>
                <h1>Search for Interpreters</h1>
                <p>We can find interpreters based on three criteria: Certification, State, and Gender.</p>
                <h2>Certification</h2>
                <input type = "text" style = {{width: "200px"}} id ="certification"/>
                <label id = "certification" style = {{display: 'block'}}>Enter the level of certification you are looking for.</label>
                <h2>State</h2>
                <input type = "text" style = {{width: "200px"}} id = "state"/>
                <label id = "state" style = {{display: 'block'}}>Enter the state from which you want an interpreter.</label>
                <h2>Gender</h2>
                <p>If you need a certain gender of interpreter, please specify here.</p>
                <div className = "radioButtonWrapper" style = {{marginLeft: "47%", textAlign: 'left', paddingBottom: '2%'}}>
                    <input type = "radio" id = "male"/>
                    <label id = "male">Male</label>
                    <p></p>
                    <input type = "radio"/>
                    <label id = "female" id = "female">Female</label>
                    <p></p>
                    <input type = "radio" id = "none"/>
                    <label id = "none">Does not matter</label>
                </div>
                <button style = {{height: "50px", fontSize: '15px', borderRadius: "50px", width: '200px'}}>Search for Interpreters!</button>
            </div>
        );
    }
}