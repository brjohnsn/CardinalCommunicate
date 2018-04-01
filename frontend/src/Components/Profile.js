import React, {Component} from 'react';
import Interpreter from './Interpreter';
import Client from './Client';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logedin: "You are logged in!",
        }

    }

    render() {
        console.log(this.props.location.userType)
        if (this.props.location.userType === "interpreter") {
            return (
                <div>
                    <Interpreter/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Client/>
                </div>
            );

        }

    }
}