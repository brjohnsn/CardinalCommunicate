import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';



export default class Interpreter extends Component {
    constructor(props) {
        super(props);
        }

    render() {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>Welcome back {this.props.userInfo.username}</h1>
                <div style={{display:'flex', justifyContent:'space-between'}}>

                    <div style={{height:'200px'}}>I am  where the picture will go</div>
                    <div style={{textAlign:'center', width:'25%', margin: 'auto'}}>
                        <h1>Events:</h1>
                        <table style = {{border: '1px solid black'}}>
                            <tr>
                                <th style = {{columnWidth: '250px'}}>Date</th>
                                <th style = {{columnWidth: '250px'}}>Location</th>
                                <th style = {{columnWidth: '200px'}}>Interpreter</th>
                                <th style = {{columnWidth: '250px'}}>Event Name</th>
                                <th style = {{columnWidth: '150px'}}>Status</th>
                                <th style = {{columnWidth: '150px'}}>EventID</th>
                                <th style = {{columnWidth: '250px'}}>Description</th>

                            </tr>
                            <p></p>



                            {this.props.userEvents.map((event)=>{
                                console.log(this.props.userEvents)
                                return(
                                    <tr style={{border:'1px solid black'}}>
                                        <th>{event.eventDate}</th>
                                        <th>{event.eventVenueName}</th>
                                        <th>{event.eventInterpreterFirstName + event.eventInterpreterLastName}</th>
                                        <th>{event.name}</th>
                                        <th>{event.eventStatus}</th>
                                        <th>{event.eventId}</th>
                                        <th>{event.eventDescription}</th>
                                    </tr>
                                );
                            })
                            }

                        </table>
                    </div>
                    <div className="sidebar" style={{backgroundColor:"grey", width:'20%', height:'100vh'}}>
                        <ul>
                            <h2>Dashboard</h2>
                            <li>Edit Profile</li>
                            <li>View Event Requests</li>
                            {/*{*/}
                                {/*this.state.pendingEvents != null &&*/}
                                {/*<li>*/}
                                    {/*<p>You have event requests pending!</p>*/}
                                    {/*<div style={{height:'20px', width:'20px', borderRadius:'50%', backgroundColor: 'red'}}></div>*/}
                                {/*</li>*/}
                            {/*}*/}
                        </ul>
                    </div>

                </div>

            </div>
        );
    }
}