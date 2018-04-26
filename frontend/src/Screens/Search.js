import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';

export default class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            certification:"",
            state:"",
            gender:"",
            interpreterSearchResults:[],
            eventId:''
        }
    }
    requestInterpreter(username){
        axios.post('http://localhost:8888/CardinalCC/public/user/request-interpreter',{interpreterUsername: username, eventId: this.state.eventId}).then((response)=> {
                console.log(response);
            }
        )
    }
    request(e){
        e.preventDefault();
        this.requestInterpreter(this.state.clickedInterpreterUsername);
    }    onSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8888/CardinalCC/public/user/Search",{ gender:this.state.gender, state:this.state.state, certification:this.state.certification, username:''}).then
        ((response)=> {
                this.setState({interpreterSearchResults: response.data})
            }
        ).then(()=> console.log(this.state.interpreterSearchResultse)
        )
    }
    render(){
        const searchButtonStyle = {height: "50px", fontSize: '17px', borderRadius: "50px", width: '210px', backgroundColor: 'rgb(120,150,255)',
            borderTopColor: 'rgb(150,150,255)', borderBottomColor: 'rgb(120,120,255)', borderLeftColor: 'rgb(135,135,255)',
            borderRightColor: 'rgb(135,135,255)'}
        return(

            <div style = {{textAlign: 'center'}}>
                <form onSubmit={(e)=>this.onSubmit(e)}>
                    <h1>Search for Interpreters</h1>
                    <p>We can find interpreters based on three criteria: Certification, State, and Gender.</p>

                    <h2>Certification</h2>
                    <input type = "text" style = {{width: "200px"}} id ="certification" onChange={(e)=>{this.setState({certification: e.target.value})}} />
                    <label id = "certification" style = {{display: 'block'}}>Enter the level of certification you are looking for.</label>
                    <h2>State</h2>
                    <input type = "text" style = {{width: "200px"}} id = "state"/>
                    <label id = "state" style = {{display: 'block'}}>Enter the state from which you want an interpreter.</label>
                    <h2>Gender</h2>
                    <p>If you need a certain gender of interpreter, please specify here.</p>
                    <div className = "radioButtonWrapper" style = {{marginLeft: "47%", textAlign: 'left', paddingBottom: '2%'}}>
                        <input type = "radio" id = "male" value = "male" onChange={(e)=>{this.setState({gender:e.target.value})}}/>
                        <label id = "male">Male</label>
                        <p></p>
                        <input type = "radio" id = "female" value = "female" onChange={(e)=>{this.setState({gender:e.target.value})}}/>
                        <label id = "female" id = "female">Female</label>
                        <p></p>
                        <input type = "radio" id = "none" value = "none" onChange={(e)=>{this.setState({gender:e.target.value})}}/>
                        <label id = "none">Does not matter</label>
                    </div>
                        <input style={{searchButtonStyle}} className="button" type="submit" value="submit"   />
                </form>
               <div style={{display:'flex', flexDirection:'row'}}>
                {this.state.interpreterSearchResults.length>0 &&
                    this.state.interpreterSearchResults.map((interpreter)=>{
                        return(
                            <ul>
                                <li><h1>{interpreter.username}</h1></li>
                                <li>
                                    <h2>Certification</h2>
                                    <ul>
                                        <p>{interpreter.certification}</p>
                                    </ul>
                                </li>
                                <li>
                                    <h2>Gender</h2>
                                    <ul>
                                        <p>{interpreter.gender}</p>
                                    </ul>
                                </li>
                                <li>
                                    <h2>State</h2>
                                    <ul>
                                        <p>{interpreter.state}</p>
                                    </ul>
                                </li>
                                <li>
                                    <div style = {{textAlign: 'center'}}>
                                        <h1>{this.state.interpreterSearchResults[0].username}</h1>
                                        <h1 style = {{display: 'block'}}>Please type your event id below.</h1>
                                        <input id='state' style = {{display: 'block'}} id="username" style={{width: "200px", marginTop: '30px'}} type="text" onChange={(e)=>{this.setState({eventId: e.target.value})}}></input>

                                        <button style = {{height: "50px", fontSize: '15px', borderRadius: "50px", width: '200px'}} onClick={(e)=>{this.request(e)}}>Request This Interpreter</button>
                                    </div>
                                </li>

                            </ul>
                        );
                    })
                }
               </div>

                <Link to={"/Profile"} style = {{paddingTop: '10%'}}>Back</Link>

            </div>

        );
    }
}