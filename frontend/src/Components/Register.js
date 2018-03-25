import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';


export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            email:"",
            gender:""
        }
    }


    onSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8888/Cardinal_cc/public/user/Register",{username:this.state.username, email:this.state.email, password:this.state.password}).then(()=> {
            console.log("user created");
            this.props.history.push("/Login")
        })

    }
    render(){
        return(
            <div>
                <form onSubmit={(e)=>this.onSubmit(e)} style={{marginLeft: "40%"}}>
                    <h1>Welcome! Register here!</h1>

                    <h2>Username</h2>
                    <input onChange={(e)=>this.setState({username:e.target.value})} value={this.state.username}/>

                    <h2>Email</h2>
                    <input onChange={(e)=>this.setState({email:e.target.value})} value={this.state.email}/>

                    <h2>Password</h2>
                    <input onChange={(e)=>this.setState({password:e.target.value})} value={this.state.password}/>

                    <h1>What is your gender?</h1>
                    <div className={"genderInput"}>

                        <div className={"male"}>
                            <input type="checkbox" id="male"/>
                            <label htmlfor="male">Male</label>
                        </div>

                        <div className={"female"}>
                            <input type="checkbox" id="female"/>
                            <label htmlfor="female">Female</label>
                        </div>
                    </div>

                    <h1>Are you a client or an interpreter?</h1>
                        <div className={"userTypeCheck"}>
                            <div className={"deafUser"}>
                                <input type="checkbox" id="deaf"/>
                                <label for="deaf">Deaf/Hard of Hearing</label>
                            </div>

                            <div className={"#"}>
                                <input type="checkbox" id="#"/>
                                <label for="#">#</label>
                            </div>

                            <div className={"interpreterUser"}>
                                <input type="checkbox" id="interpreter"/>
                                <label for="interpreter">Interpreter</label>
                            </div>
                        </div>

                    <input className="button" type="submit" value="submit"/>
                    <h2>Already have an account? Click here!</h2>
                    <Link to={'/Login'}>Login</Link>
                </form>
            </div>
        );
    }
}