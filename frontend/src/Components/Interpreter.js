import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class Interpreter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            email:"",
            phoneNumber:"",
            certification:"",
            zipcode:""
        }
        }

    componentWillMount() {
        axios.post("http://localhost:8888/CardinalCC/public/user/Profile", {username: sessionStorage.getItem('username')}).then((response) => {
            console.log(response.data);
            this.setState({username: response.data.username, email: response.data.email, certification: response.data.certification, zipcode: response.data.zipcode, phoneNumber: response.data.phoneNumber});
        });
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>Welcome back {this.state.username}</h1>
                <div style={{display:'flex', justifyContent:'space-between'}}>

                    <div style={{backgroundColor:'blue', height:'200px'}}>I am  where the picture will go</div>
                    <div style={{textAlign:'center', width:'25%', margin: 'auto', backgroundColor: 'purple'}}>
                        <h1>bio</h1>
                        <p>Hi! my name is {this.state.username}. I am an interpreter. I have a {this.state.certification}. If you wish to contact me to schedual a n appointment my email is {this.state.email}. If it is more convenient here is my phone number ({this.state.phoneNumber}). Please contact me with any questions.</p>
                    </div>
                    <div className="sidebar" style={{backgroundColor:"blue", width:'20%', height:'100vh'}}>
                        <ul>
                            <h2>Dashboard</h2>
                            <li>Edit Profile</li>
                            <li>Search Interpreters</li>
                            <li>Find Interpreters Near Me</li>
                        </ul>
                    </div>

                </div>

            </div>
        );
    }
}