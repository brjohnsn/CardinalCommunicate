import React, {Component} from 'react';
import Interpreter from './Interpreter';
import Client from './Client';

export default class Profile extends Component {
    constructor(props) {
        //move axios request to here
        super(props);
        this.state = {
            logedin: "You are logged in!",
        }

    }

    render() {
        console.log(this.props);
        if (this.props.location.userType === "interpreter") {
            return (
                <div style={{backgroundColor:'blue'}}>
                    <Interpreter/>
                </div>
            );
        }
        else {
            return (
                <div style={{backgroundColor:'yellow'}}>
                    <Client/>
                </div>
            );

        }

    }
}