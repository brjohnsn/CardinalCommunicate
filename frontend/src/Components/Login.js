import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
        }
    }


    onSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8888/CardinalCC/public/user/login",{username:this.state.username,  password:this.state.password}).then((response)=> {
            console.log(response.data);
            this.props.history.push("/Profile");
        })

    }
    render(){
        return(
            <div>
                <form onSubmit={(e)=>this.onSubmit(e)} style={{marginLeft:"40%"}}>
                    <h1>Login</h1>
                    <h2>Username</h2>
                    <input onChange={(e)=>this.setState({username:e.target.value})} value={this.state.username}/>
                    <h2>Password</h2>
                    <input onChange={(e)=>this.setState({password:e.target.value})} value={this.state.password}/>
                    <input className="button" type="submit" value="submit"/>
                </form>
            </div>
        );
    }
}