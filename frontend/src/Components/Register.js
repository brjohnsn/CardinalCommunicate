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
            certification:"",
            phoneNumber:"",
            zipcode:""
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
            console.log(this.state);
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
                                this.state.userType === "interpreter" &&
                                <div className="radioButtonWrapper" style={{display:"flex", flexDirection: "column"}}>
                                    <h1>Have a certification?</h1>
                                    <input type="radio" name="certification" value="CDI"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">CDI</label>
                                    <input type="radio" name="certification" value="CSC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">CSC</label>
                                    <input type="radio" name="certification" value="EIC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">EIC</label>
                                    <input type="radio" name="certification" value="IC/TC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">IC/TC</label>
                                    <input type="radio" name="certification" value="NAD IV"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NAD IV</label>
                                    <input type="radio" name="certification" value="NIC Advanced"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NIC Advanced</label>
                                    <input type="radio" name="certification" value="OIC:S/V"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">OIC:S/V</label>
                                    <input type="radio" name="certification" value="Prov. SC:L"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">Prov. SC:L</label>
                                    <input type="radio" name="certification" value="SC:PA"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">SC:PA</label>
                                    <input type="radio" name="certification" value="CI"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">CI</label>
                                    <input type="radio" name="certification" value="CT"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">CT</label>
                                    <input type="radio" name="certification" value="ETC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">ETC</label>
                                    <input type="radio" name="certification" value="MCSC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">MCSC</label>
                                    <input type="radio" name="certification" value="NAD V"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NAD V</label>
                                    <input type="radio" name="certification" value="NIC Master"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NIC Master</label>
                                    <input type="radio" name="certification" value="OIC:V/S"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">OIC:V/S</label>
                                    <input type="radio" name="certification" value="RSC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">RSC</label>
                                    <input type="radio" name="certification" value="TC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">TC</label>
                                    <input type="radio" name="certification" value="CLIP"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">CLIP</label>
                                    <input type="radio" name="certification" value="Ed:K-12"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">Ed:K-12</label>
                                    <input type="radio" name="certification" value="IC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">IC</label>
                                    <input type="radio" name="certification" value="NAD III"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NAD III</label>
                                    <input type="radio" name="certification" value="NIC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NIC</label>
                                    <input type="radio" name="certification" value="OIC:C"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">OIC:C</label>
                                    <input type="radio" name="certification" value="OTC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">OTC</label>
                                    <input type="radio" name="certification" value="SC:L"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">SC:L</label>

                                    <input id="certification"  style={{width: "200px"}} type="text" onChange={(e)=>{this.setState({certification: e.target.value})}} />
                                    <label for="certification" style={{display: "block"}}>Enter alternative certification title here.</label>

                                    <h1>Telephone Number</h1>
                                    <input id="Phone"  style={{width: "200px"}} type="text" onChange={(e)=>{this.setState({certification: e.target.value})}} />
                                    <label for="Phone"  style={{display: "block"}}>Enter phone number here.</label>

                                    <h1>Zipcode</h1>
                                    <input id="address"  style={{width: "200px"}} type="text" onChange={(e)=>{this.setState({certification: e.target.value})}} />
                                    <label for="adress"  style={{display: "block"}}>Enter zipcode here.</label>

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