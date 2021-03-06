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
            zipcode:"",
            address1:"",
            address2:"",
            city:"",
            state:"",
            firstName:"",
            lastName:""
        }
    }

    onSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8888/CardinalCC/public/user/Register",{
            username:this.state.username,
            password:this.state.password,
            gender:this.state.gender,
            userType:this.state.userType,
            telephone:this.state.phoneNumber,
            certification: this.state.certification,
            zip:this.state.zipcode,
            address1:this.state.address1,
            address2:this.state.address2,
            city:this.state.city,
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            state:this.state.state}).then((response)=> {
            this.props.history.push("/Login")
        }
        )

    }
    render(){
        const style = {textAlign: 'center', backgroundColor: 'rgb(230,230,230)', borderRadius: '100px',
            paddingTop: '1%', marginLeft: '25%', marginRight: '25%', paddingBottom: '3%'}
        const radioButtonStyle = {marginLeft: '45%', textAlign: 'left'}
        return(
            <div style = {style}>
                <form onSubmit={(e)=>this.onSubmit(e)}>
                    <h1>Welcome! Register here!</h1>

                    <h2>Username</h2>
                    <input onChange={(e)=>this.setState({username:e.target.value})}/>

                    <h2>First Name</h2>
                    <input onChange={(e)=>this.setState({firstName:e.target.value})}/>

                    <h2>Last Name</h2>
                    <input onChange={(e)=>this.setState({lastName:e.target.value})}/>

                    <h2>Address 1</h2>
                    <input onChange={(e)=>this.setState({address1:e.target.value})}/>

                    <h2>Address 2</h2>
                    <input onChange={(e)=>this.setState({address2:e.target.value})}/>

                    <h2>City</h2>
                    <input onChange={(e)=>this.setState({city:e.target.value})}/>

                    <h2>State</h2>
                    <input onChange={(e)=>this.setState({state:e.target.value})}/>

                    <h1>Zipcode</h1>
                    <input id="address"  style={{width: "200px"}} type="text" onChange={(e)=>{this.setState({zipcode: e.target.value})}} />
                    <label for="adress"  style={{display: "block"}}>Enter zipcode here.</label>


                    <h2>Password</h2>
                    <input type='password' onChange={(e)=>this.setState({password:e.target.value})}/>

                    <h1>What is your gender?</h1>
                    <div className={"radioButtonWrapper"} style = {radioButtonStyle}>
                        <input type="radio" name="gender" value="male" onChange={(e)=>{this.setState({gender:e.target.value})}}/>
                        <label htmlfor="male">Male</label>
                        <p></p>
                        <input type="radio" name="gender" value="female" onChange={(e)=>{this.setState({gender:e.target.value})}}/>
                        <label htmlfor="female">Female</label>
                    </div>

                    <h1>Are you a client or an interpreter?</h1>
                    <div>
                        <div className={"radioButtonWrapper"} style={radioButtonStyle}>
                                <input type="radio" name="userType" value="Deaf" onChange={(e)=>{this.setState({userType: e.target.value})}}/>
                                <label for="deaf">Deaf/Hard of Hearing</label>
                            <p></p>
                                <input type="radio" name="userType"  value="other" onChange={(e)=>{this.setState({userType: e.target.value})}}/>
                                <label for="other">Other</label>
                            <p></p>
                                <input type="radio" name="userType" value="interpreter"  onChange={(e)=>{this.setState({userType: e.target.value})}}/>
                                <label for="interpreter">Interpreter</label>
                        </div>

                            {
                                this.state.userType === "interpreter" &&
                                <div className="radioButtonWrapper">
                                    <h1>Have a certification?</h1>
                                    //move into json file
                                    <div style = {{textAlign: 'center'}}>
                                    <input type="radio" name="certification" value="CDI"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">CDI  </label>
                                    <input type="radio" name="certification" value="CSC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">CSC</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="EIC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">EIC</label>
                                    <input type="radio" name="certification" value="IC/TC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">IC/TC</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="NAD IV"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NAD IV</label>
                                    <input type="radio" name="certification" value="NIC Advanced"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NIC Advanced</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="OIC:S/V"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">OIC:S/V</label>
                                    <input type="radio" name="certification" value="Prov. SC:L"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">Prov. SC:L</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="SC:PA"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">SC:PA</label>
                                    <input type="radio" name="certification" value="CI"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">CI</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="CT"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">CT</label>
                                    <input type="radio" name="certification" value="ETC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">ETC</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="MCSC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">MCSC</label>
                                    <input type="radio" name="certification" value="NAD V"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NAD V</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="NIC Master"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NIC Master</label>
                                    <input type="radio" name="certification" value="OIC:V/S"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">OIC:V/S</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="RSC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">RSC</label>
                                    <input type="radio" name="certification" value="TC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">TC</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="CLIP"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">CLIP</label>
                                    <input type="radio" name="certification" value="Ed:K-12"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">Ed:K-12</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="IC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">IC</label>
                                    <input type="radio" name="certification" value="NAD III"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NAD III</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="NIC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">NIC</label>
                                    <input type="radio" name="certification" value="OIC:C"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">OIC:C</label>
                                        <p></p>
                                    <input type="radio" name="certification" value="OTC"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">OTC</label>
                                    <input type="radio" name="certification" value="SC:L"  onChange={(e)=>{this.setState({certification: e.target.value})}}/>
                                    <label for="certification">SC:L</label>
                                    </div>

                                    <input id="certification"  style={{width: "200px"}} type="text" onChange={(e)=>{this.setState({certification: e.target.value})}} />
                                    <label for="certification" style={{display: "block"}}>Enter alternative certification title here.</label>

                                    <h1>Telephone Number</h1>
                                    <input id="Phone"  style={{width: "200px"}} type="text" onChange={(e)=>{this.setState({phoneNumber: e.target.value})}} />
                                    <label for="Phone"  style={{display: "block"}}>Enter phone number here.</label>


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

