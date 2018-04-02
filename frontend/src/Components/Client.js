import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }

    componentWillMount() {
        axios.get("http://localhost:8888/CardinalCC/public/user/Profile").then((response) => {
            this.setState({username: response.data.username});
            console.log(response.data)
        });
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>Welcome back Client {this.state.username}</h1>
                <div style={{display:'flex', justifyContent:'space-between'}}>

                    <div style={{backgroundColor:'blue'}}>I am  where the picture will go</div>
                    <div className="sidebar" style={{backgroundColor:"blue", width:'30%'}}>
                        <ul>
                            <h2>Dashboard</h2>
                            <li>Edit Profile</li>
                            <li>Search Interpreters</li>
                            <li>Find Interpreters Near Me</li>
                        </ul>
                    </div>
                 </div>
                <div style={{textAlign:'center', width:'25%', margin: 'auto', backgroundColor: 'purple'}}>
                    <h1>bio</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et erat et leo efficitur posuere. Proin blandit tincidunt egestas. Vivamus cursus eleifend blandit. Pellentesque ac finibus est. Aliquam sed purus vel ante ultrices malesuada. Morbi mi nunc, vehicula vestibulum nunc ut, sollicitudin laoreet neque. Nunc quis posuere enim. Integer nisl magna, aliquam ut tristique eu, eleifend a urna.

                        Nunc id odio vitae massa venenatis accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vel massa eget nisl malesuada facilisis ut in arcu. Quisque porta ultrices est et vestibulum. Cras ac pharetra eros, a rutrum purus. Curabitur lacinia malesuada tellus id viverra. Ut semper porta faucibus. Vestibulum semper augue non tortor rhoncus fermentum. Donec imperdiet enim eget odio rutrum gravida. Aenean fermentum ante non dictum pulvinar.

                        Nunc ut leo ac felis ornare imperdiet sit amet sed mauris. Ut vitae laoreet risus, a interdum lorem. Maecenas gravida nisl vitae felis hendrerit, dignissim ullamcorper mi fringilla. Integer tempor congue finibus. Cras consectetur vel purus eget euismod. Morbi mattis nulla sit amet ante consequat tincidunt. Morbi consectetur arcu ac tortor volutpat, in semper magna venenatis. Morbi non dolor nec eros dapibus vulputate.

                        Aliquam varius condimentum malesuada. Suspendisse sagittis, sapien in viverra sollicitudin, nibh tellus varius ex, ac commodo orci ante a nisl. Aliquam tempus pellentesque nisi, vel consectetur turpis convallis in. Curabitur massa mauris, fermentum ac varius nec, facilisis vitae velit. Donec sed nibh semper, fermentum metus quis, tristique quam. Ut fermentum metus et sodales viverra. Ut eget ornare sapien.

                        Sed tortor massa, fermentum vitae condimentum non, vulputate nec risus. Nam in mi purus. Duis non convallis ante. Maecenas vitae faucibus diam. Fusce in tincidunt nisi. Sed eget me</p>
                </div>
            </div>
                );
    }
}