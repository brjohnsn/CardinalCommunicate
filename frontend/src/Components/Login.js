import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName:"",
            password:"",
        }
    }


    onSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8888/CardinalCC/public/user/login",{username:this.state.userName,  password:this.state.password}).then((response)=> {
            console.log(response.data);
            if(response.data.userType === null){
                return;
            }
            console.log(response.data.userType);
            sessionStorage.setItem('username', response.data.username);

            this.props.history.push({
                pathname:"/Profile",
                userType:response.data.userType
            });
        })

    }
    render(){
        return(
            <div>
                <form onSubmit={(e)=>this.onSubmit(e)} style={{marginLeft:"40%"}}>
                    <h1>Login</h1>
                    <h2>Username</h2>
                    <input onChange={(e)=>this.setState({userName:e.target.value})} />
                    <h2>Password</h2>
                    <input onChange={(e)=>this.setState({password:e.target.value})} />
                    <input className="button" type="submit" value="submit"/>
                </form>

            </div>
        );
    }
}

