import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class Client extends Component {
    constructor(props) {
        super(props);
    }


    render(){
        console.log(this.props.userInfo.userEvents);
        return (
            <div style = {{backgroundColor: 'rgb(230,230,230)', borderRadius: '60px'}}>
                <h1 style={{textAlign:'center'}}>Welcome back {this.props.userInfo.username}</h1>
                <div style={{display:'flex', justifyContent:'space-between'}}>

                    <div style={{height:'200px'}}>I am  where the picture will go</div>
                    <div style={{textAlign:'center', width:'25%', margin: 'auto', backgroundColor: 'rgb(200,200,200)', height: '400px', width: '450px', borderRadius: '40px'}}>
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
                            


                            {this.props.userEvents.map((event)=>{
                                return(
                                    <tr style={{border:'1px solid black'}}>
                                        <th>{event.eventDate}</th>
                                        <th>{event.eventVenueName}</th>
                                        <th>{event.interpreterFirstName + event.interpreterLastName}</th>
                                        <th>{event.name}</th>
                                        <th>{event.eventStatus}</th>
                                        <th>{event.eventDescription}</th>
                                    </tr>
                                );
                            })
                            }


                        </table>
                    </div>
                    <div className="sidebar" style={{backgroundColor:"grey", width:'20%', height:'100vh', borderRadius: '20px'}}>
                        <ul>
                            <h2>Dashboard</h2>
                            <li><Link to={'/Settings'}>Edit Profile</Link></li>
                            <li><Link to={'/Search'}>Search Interpreters</Link></li>
                            <li><Link to={{pathname: '/Map/', userInfo:this.props.userInfo}}>Find Interpreters Near Me</Link></li>
                        </ul>
                    </div>

                 </div>

            </div>
                );
    }
}