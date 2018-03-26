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
            gender:"",
            userType:"",
            certification:""
        }
    }


    setGender(e){
        e.preventDefault();
        if(this.state.gender == 'male'){
            document.getElementById('male').checked = false;
            this.setState({gender:e.target.value})
        }
        if(this.state.gender == 'female'){
            document.getElementById('female').checked = false;
            this.setState({gender:e.target.value})

        }
        else{
            this.setState({gender:e.target.value})
        }

    }

    setInterpreter(e){
        e.preventDefault();
        this.setState({userStatus: e.target.value});

    }

    onSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8888/CardinalCC/public/user/Register",{username:this.state.username, email:this.state.email, password:this.state.password, gender:this.state.gender, userStatus:this.state.userStatus}).then(()=> {
            this.props.history.push("/Login")
        }
        )

    }
    render(){
        let interpreterToggled = false;
        return(
            <div style={{}}>
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
                            <input type="checkbox" id="male" value="male" onChange={(e)=>{this.setGender(e)}}/>
                            <label htmlfor="male">Male</label>
                        </div>

                        <div className={"female"}>
                            <input type="checkbox" id="female" value="female" onChange={(e)=>{this.setGender(e)}}/>
                            <label htmlfor="female">Female</label>
                        </div>

                    </div>

                    <h1>Are you a client or an interpreter?</h1>
                        <div className={"userTypeCheck"}>
                            <div className={"deafUser"}>
                                <input type="checkbox" id="deaf" value="Deaf" onChange={(e)=>{this.setState({userStatus: e.target.value})}}/>
                                <label for="deaf">Deaf/Hard of Hearing</label>
                            </div>

                            <div className={"#"}>
                                <input type="checkbox" id="other" value="other" onChange={(e)=>{this.setState({userStatus: e.target.value})}}/>
                                <label for="other">Other</label>
                            </div>

                            <div className={"interpreterUser"}>
                                <input type="checkbox" id="interpreter" value="interpreter"  onChange={(e)=>{this.setInterpreter(e)}}/>
                                <label for="interpreter">Interpreter</label>
                            </div>
                            {
                                this.state.userStatus == "interpreter" &&
                                <div className="interpreterCertification">
                                    <h1>Have a certification?</h1>
                                    <input id="certification" onChange={(e)=>{this.setState({certification: e.target.value})}} />
                                    <label for="certification" style={{display: "block"}}>enter here</label>
                                </div>
                            }
                        </div>

                    <input className="button" type="submit" value="submit" style={{marginTop:"40px"}}/>
                    <h2>Already have an account? Click here!</h2>
                    <Link to={'/Login'}>Login</Link>


                </form>
            </div>
        );
    }
}