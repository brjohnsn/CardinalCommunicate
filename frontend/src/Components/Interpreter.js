import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class Interpreter extends Component {
    constructor(props) {
        super(props);
        }

    render() {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>Welcome back {this.props.userInfo.username}</h1>
                <div style={{display:'flex', justifyContent:'space-between'}}>

                    <div style={{height:'200px'}}>I am  where the picture will go</div>
                    <div style={{textAlign:'center', width:'25%', margin: 'auto'}}>
                        <h1>bio</h1>
                        <p>Hi! my name is {this.props.userInfo.username}. I am an interpreter. I have a {this.props.userInfo.certification}. If you wish to contact me to schedual an appointment my phone number ({this.props.userInfo.telephone}). Please contact me with any questions.</p>
                    </div>
                    <div className="sidebar" style={{backgroundColor:"grey", width:'20%', height:'100vh'}}>
                        <ul>
                            <h2>Dashboard</h2>
                            <li>Edit Profile</li>
                            <li>View Event Requests</li>
                        </ul>
                    </div>

                </div>

            </div>
        );
    }
}