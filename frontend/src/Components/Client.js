import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class Client extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>Welcome back {this.props.userInfo.username}</h1>
                <div style={{display:'flex', justifyContent:'space-between'}}>

                    <div style={{height:'200px'}}>I am  where the picture will go</div>
                    <div style={{textAlign:'center', width:'25%', margin: 'auto' }}>
                        <h1>Events:</h1>
                        <table>
                            <tr>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Interpreter</th>
                                <th>Event Name</th>
                                <th>Status</th>
                                <th>Description</th>
                            </tr>
                            {this.props.userInfo.events.map((event)=>{
                                return(
                                    <tr>
                                        <th>{event.date}</th>
                                        <th>{event.location}</th>
                                        <th>{event.interpreter}</th>
                                        <th>{event.name}</th>
                                        <th>{event.status}</th>
                                        <th>{event.description}</th>
                                    </tr>
                                );
                            })
                            }

                        </table>
                    </div>
                    <div className="sidebar" style={{backgroundColor:"grey", width:'20%', height:'100vh'}}>
                        <ul>
                            <h2>Dashboard</h2>
                            <li><Link to={'/Settings'}>Edit Profile</Link></li>
                            <li><Link to={'/Search'}>Search Interpreters</Link></li>
                            <li><Link to={'/Map/'+this.props.userInfo}>Find Interpreters Near Me</Link></li>
                        </ul>
                    </div>

                 </div>

            </div>
                );
    }
}