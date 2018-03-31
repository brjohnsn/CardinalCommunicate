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
        axios.get("http://localhost:8888/Cardinal_cc/public/user/Profile").then((response) => {
            this.setState({username: response.data.username})
            console.log(response.data)
        });
    }

    render() {
        return (
            <div>
                <h1>I am the Interpreter</h1>
                <p>my name is {this.state.username}</p>
            </div>
        );
    }
}