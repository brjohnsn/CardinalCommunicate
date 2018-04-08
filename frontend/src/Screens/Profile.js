import React, {Component} from 'react';
import Interpreter from '../Components/Interpreter';
import Client from '../Components/Client';
import axios from "axios/index";

export default class Profile extends Component {
    constructor(props) {
        //move axios request to here
        super(props);
        this.state = {
            userInfo: []
        }

    }
    componentWillMount() {
        axios.post("http://localhost:8888/CardinalCC/public/user/Profile", {username: sessionStorage.getItem('username')}).then((response) => {
            //change zipcode to zip
            console.log(response.data);
            this.setState({userInfo: response.data});
        });
    }

    render() {
        if (this.props.location.userType === "interpreter") {
            return (
                <div>
                    <Interpreter userInfo={this.state.userInfo}/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Client userInfo={this.state.userInfo}/>
                </div>
            );

        }

    }
}