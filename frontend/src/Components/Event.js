import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class Event extends Component{
    constructor(props){
        super(props);
        this.state={
            eventName: '',
            eventDescription:'',
            eventVenueName:'',
            eventAddress1: '',
            eventCity: '',
            eventState: '',
            eventZip: '',
            eventDate: '',
            eventStartTime: '',
            eventEndTime: '',
            eventStatus:'',
            eventClientId:'',
            eventInterpreterId: '',
            interpreterUsername:''

        }
    }

    onSubmit(e){
        e.preventDefault();
        this.getInterpreterIdByUsername(this.state.interpreterUsername);
        axios.post('http://localhost:8888/CardinalCC/public/user/add-event',{
            eventName: this.state.eventName,
            eventDescription: this.state.eventDescription,
            eventVenueName: this.state.eventVenueName,
            eventAddress1: this.state.eventAddress1,
            eventCity: this.state.eventCity,
            eventState: this.state.eventState,
            eventZip: this.state.eventZip,
            eventDate: this.state.eventDate,
            eventStartTime: this.state.eventStartTime,
            eventEndTime: this.state.eventEndTime,
            eventStatus:this.state.eventStatus,
            eventClientId:this.props.match.params.userId,
            eventInterpreterId: this.state.eventInterpreterId
        }).then((response)=>console.log(response))
    }
    getInterpreterIdByUsername(userName){
        axios.post("http://localhost:8888/CardinalCC/public/user/Search",{ gender:'', state:'', certification:'', username:userName}).then(
            (response)=>{ this.setState({eventInterpreterId:response.data.id});})
    }

    render(){
        return(
            <form onSubmit={(e)=>this.onSubmit(e)}>
                <h1>Create an event here!</h1>

                <h2>Event Name</h2>
                <input onChange={(e)=>this.setState({eventName:e.target.value})}/>
                <h2>Event Description</h2>
                <input onChange={(e)=>this.setState({eventDescription:e.target.value})}/>
                <h2>Event Venue</h2>
                <input onChange={(e)=>this.setState({eventVenueName:e.target.value})}/>
                <h2>Event Address</h2>
                <input onChange={(e)=>this.setState({eventAddress1:e.target.value})}/>
                <h2>Event City</h2>
                <input onChange={(e)=>this.setState({eventCity:e.target.value})}/>
                <h2>Event State</h2>
                <input onChange={(e)=>this.setState({eventState:e.target.value})}/>
                <h2>Event Zipcode</h2>
                <input onChange={(e)=>this.setState({eventZip:e.target.value})}/>
                <h2>Date of Event</h2>
                <input onChange={(e)=>this.setState({eventDate:e.target.value})}/>
                <h2>Expected Start Time</h2>
                <input onChange={(e)=>this.setState({eventStartTime:e.target.value})}/>
                <h2>Expected End Time</h2>
                <input onChange={(e)=>this.setState({eventEndTime:e.target.value})}/>
                <h2>Event Status</h2>
                <input onChange={(e)=>this.setState({eventStatus:e.target.value})}/>
                <h2>Interpreter Username </h2>
                <input onChange={(e)=>this.setState({interpreterUsername:e.target.value})}/>
                <input className="button" type="submit" value="submit" style={{marginTop:"40px"}}/>
                <Link to={'/Profile'}>go back</Link>

            </form>
        );
    }
}




