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

    //
    // setGender(e){
    //     e.preventDefault();
    //     if(this.state.gender == 'male'){
    //         // document.getElementById('male').checked = false;
    //
    //     }
    //     if(this.state.gender == 'female'){
    //         // document.getElementById('female').checked = false;
    //         this.setState({gender:e.target.value})
    //
    //     }
    //     else{
    //         this.setState({gender:e.target.value})
    //     }
    //
    // }

    setInterpreter(e){
        e.preventDefault();
        this.setState({userStatus: e.target.value});

    }

    onSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8888/CardinalCC/public/user/Register",{username:this.state.username, email:this.state.email, password:this.state.password, gender:this.state.gender, userType:this.state.userType}).then((response)=> {
            console.log(response.data)
            this.props.history.push("/Login")
        }
        )

    }
    render(){
        return(
            <div>
                <form onSubmit={(e)=>this.onSubmit(e)} style={{marginLeft: "40%"}}>
                    <h1>Welcome! Register here!</h1>

                    <h2>Username</h2>
                    <input onChange={(e)=>this.setState({username:e.target.value})}/>

                    <h2>Email</h2>
                    <input onChange={(e)=>this.setState({email:e.target.value})}/>

                    <h2>Password</h2>
                    <input onChange={(e)=>this.setState({password:e.target.value})}/>

                    <h1>What is your gender?</h1>
                    <div className={"radioButtonWrapper"} style={{display:"flex", flexDirection: "column"}}>
                        <input type="radio" name="gender" value="male" onChange={(e)=>{this.setState({gender:e.target.value})}}/>
                        <label htmlfor="male">Male</label>
                        <input type="radio" name="gender" value="female" onChange={(e)=>{this.setState({gender:e.target.value})}}/>
                        <label htmlfor="female">Female</label>
                    </div>

                    <h1>Are you a client or an interpreter?</h1>
                        <div className={"radioButtonWrapper"} style={{display:"flex", flexDirection: "column"}}>
                                <input type="radio" name="userType" value="Deaf" onChange={(e)=>{this.setState({userType: e.target.value})}}/>
                                <label for="deaf">Deaf/Hard of Hearing</label>
                                <input type="radio" name="userType"  value="other" onChange={(e)=>{this.setState({userType: e.target.value})}}/>
                                <label for="other">Other</label>
                                <input type="radio" name="userType" value="interpreter"  onChange={(e)=>{this.setState({userType: e.target.value})}}/>
                                <label for="interpreter">Interpreter</label>
                            {
                                this.state.userStatus === "interpreter" &&
                                <div className="radioButtonWrapper" style={{display:"flex", flexDirection: "column"}}>
                                    <h1>Have a certification?</h1>
                                    <input type="radio" name="certification" value="#"  onChange={(e)=>{this.setState({userType: e.target.value})}}/>
                                    <label for="interpreter">#</label>
                                    <input type="radio" name="certification" value="#"  onChange={(e)=>{this.setState({userType: e.target.value})}}/>
                                    <label for="#">#</label>
                                    <input id="certification"  type="text" onChange={(e)=>{this.setState({certification: e.target.value})}} />
                                    <label for="certification" style={{display: "block"}}>Enter alternative certification title here.</label>
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