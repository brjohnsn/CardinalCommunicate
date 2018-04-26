import React, {Component} from 'react';
import Interpreter from '../Components/Interpreter';
import Client from '../Components/Client';
import axios from "axios/index";

export default class Profile extends Component {
    constructor(props) {
        //move axios request to here
        super(props);
        this.state = {
            userInfo: {},
            userEvents:[]
        }


    }

    componentWillMount() {
        axios.post("http://localhost:8888/CardinalCC/public/user/Profile", {username: sessionStorage.getItem('username')}).then((response) => {
            //change zipcode to zip
            console.log(response.data);
            if(response.data.userEvents != null){
                console.log('user events had stuff');
            this.setState({
                userInfo: response.data,
                userEvents: response.data.userEvents
            });
            }
            else{
                console.log('user events dont have stuff');
                this.setState({
                    userInfo: response.data
                });
            }
        });
    }

    render(){
        console.log(this.props);
        if (this.props.history.location.userType === "interpreter") {
            return (
                <div>
                    <Interpreter userInfo={this.state.userInfo} userEvents={this.state.userEvents}/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Client userInfo={this.state.userInfo} userEvents={this.state.userEvents}/>
                </div>
            );

        }

    }
}