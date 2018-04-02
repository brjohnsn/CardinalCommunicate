import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class Interpreter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:""
        }
        }

    componentWillMount() {
        axios.get("http://localhost:8888/CardinalCC/public/user/Profile").then((response) => {
            this.setState({username: response.data.username})
            console.log(response.data)
        });
    }

    render() {
        return (
            <div className="top" style={{display:'flex', flexDirection:"row"}} >
                <div className="top">
                    <h1>Welcome back  Interpreter{this.state.username}</h1>
                </div>
                <div className="left"></div>
                <div className="sidebar" style={{backgroundColor:"blue"}}>
                    <h1>I am the Interpreter</h1>
                </div>
            </div>
        );
    }
}