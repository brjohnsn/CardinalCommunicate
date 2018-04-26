import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
            console.log(response.data)
            if(response.data.userType === null){
                return;
            }
            sessionStorage.setItem('username', response.data.username);

            this.props.history.push({
                pathname:"/Profile",
                userType:response.data.userType
            });
        })

    }
    render(){
        const style = {textAlign: 'center', backgroundColor: 'rgb(230,230,230)', borderRadius: '100px', marginLeft: '35%', marginRight: '35%', height: '350px'}
        return(
            <div style = {style}>
                <form onSubmit={(e)=>this.onSubmit(e)}>
                    <h1 style = {{paddingTop: '5%'}}>Login</h1>
                    <h3>Username</h3>
                    <input onChange={(e)=>this.setState({userName:e.target.value})} />
                    <h3>Password</h3>
                    <input onChange={(e)=>this.setState({password:e.target.value})} />
                    <p></p>
                    <input className="button" type="submit" value="submit"/>
                </form>

            </div>
        );
    }
}

