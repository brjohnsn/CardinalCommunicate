import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';


export default class Client extends Component {
    constructor(props) {
        super(props);
        this.state={
            interpreterSearchResults:[],
            eventId:''
        }
    }
    onSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8888/CardinalCC/public/user/Search",{ gender:'', state:'', certification:'', username:this.state.clickedInterpreterUsername}).then
        ((response)=> {
                this.setState({interpreterSearchResults: response.data})
            }
        ).then(()=> {console.log(this.state.interpreterSearchResults)}
        )
    }
    onClick(e){
        e.preventDefault();
        this.requestInterpreter(document.getElementById('request-interpreter')).then(

        )
    }

    testUserLength(){
        return(
            <div style = {{textAlign: 'center'}}>
                <h1>Username: {this.state.interpreterSearchResults[0].username}</h1>
                <input id='state' style = {{display: 'block'}} id="username" style={{width: "200px", marginTop: '30px'}} type="text" onChange={(e)=>{this.setState({eventId: e.target.value})}}></input>
                <p></p>
                <label id = "state" style = {{display: 'bl'}}>Please type your event id above.</label>
                <p></p>
                <button style = {{height: "50px", fontSize: '15px', borderRadius: "50px", width: '200px'}}  onClick={()=>{this.requestInterpreter(this.state.interpreterSearchResults[0].username)}}>Request This Interpreter</button>
                <p></p>
            </div>
        );
    }

    requestInterpreter(username){
        axios.post('http://localhost:8888/CardinalCC/public/user/request-interpreter',{interpreterUsername: username, eventId: this.state.eventId}).then((response)=> {
                console.log(response);
            }
        ).then(()=>{window.location.reload()})
    }

    render(){
        console.log(this.props.userInfo);
        return (
            <div style = {{backgroundColor: 'rgb(230,230,230)', borderRadius: '60px'}}>
                <h1 style={{textAlign:'center'}}>Welcome back {this.props.userInfo.username}</h1>
                <div style={{display:'flex', justifyContent:'space-between'}}>

                    <div style={{height:'200px'}}>I am  where the picture will go</div>
                    <div style={{textAlign:'left', width:'25%', margin: 'auto', backgroundColor: 'rgb(200,200,200)', height: '400px', width: '900px', borderRadius: '40px'}}>
                        <h1 style = {{textAlign: 'center'}}>Events:</h1>
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
                                        {event.eventInterpreterFirstName == null ?
                                            <th>0</th>
                                            :
                                            <th>{event.eventInterpreterFirstName + "" + event.eventInterpreterLastName}</th>
                                        }
                                        <th>{event.eventName}</th>
                                        <th>{event.eventStatus}</th>
                                        <th>{event.eventId}</th>
                                        <th>{event.eventDescription}</th>
                                    </tr>
                                );
                            })
                            }

                        </table>


                        <form onSubmit={(e)=>this.onSubmit(e)}>
                            <h1 style={{textAlign:'center', marginTop:'200px'}}>Request Interpreter</h1>
                            <input id="username" style={{width: "200px", marginTop: '30px'}} type="text" onChange={(e)=>{this.setState({clickedInterpreterUsername: e.target.value})}} />
                            <input className="button" type="submit" value="submit" style={{marginTop:"40px"}}/>
                        </form>
                        {
                            this.state.interpreterSearchResults.length > 0 &&
                            this.testUserLength()
                        }

                    </div>
                    <div className="sidebar" style={{backgroundColor:"grey", width:'20%', height:'100vh', borderRadius: '20px'}}>
                        <ul>
                            <h2>Dashboard</h2>
                            <li><Link to={'/Event/'+this.props.userInfo.id}>Create Events</Link></li>
                            <li><Link to={'/Search'}>Search Interpreters</Link></li>
                            <li><Link to={{pathname: '/Map/'+this.props.userInfo.address}}>Find Interpreters Near Me</Link></li>
                        </ul>
                    </div>

                 </div>

            </div>
                );
    }
}