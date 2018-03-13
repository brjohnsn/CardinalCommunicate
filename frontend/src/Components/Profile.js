import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            logedin: "You are logged in!",

        }

    }
    // componentWillMount() {
    //     axios.get("http://localhost:8888/Cardinal_cc/public/user/Profile").then((response) => {
    //         this.setState({loggedin: response.data})
    //         console.log(response.data)
    //     });
    // }
    render(){
        return(
            <div>
                <h1>{this.state.logedin}</h1>

            </div>
        )
        }
}