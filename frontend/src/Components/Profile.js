import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "bob",
            email: "bob@gmail.com"
        }

    }
    componentWillMount() {
        axios.get("http://localhost:8888/forum_backend/public/api/thread/" + this.props.match.params.thread_id).then((response) => {
            this.setState({username: response.data.username, email: response.data.email})
        });
    }
    render(){
        return(
            <div>
                <h1>{this.state.username}</h1>
                <h1>{this.state.email}</h1>
            </div>
        )
        }
}