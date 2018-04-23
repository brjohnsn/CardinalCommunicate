import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_MAPS_API_KEY} from '../conf/config';
import ClientMarker from '../Components/ClientMarker';
import InterpreterMarker from '../Components/InterpreterMarker';
import axios from "axios/index";
import interpreters from "../assets/testJson/testInterpreters";
import {K_SIZE} from './hoverStyles';
import controllable from 'react-controllable'



export default class Map extends Component{
    constructor(props){
        super(props);
        this.state={
            interpreterInfo: [],
            interpreterSearchResults:[],
            clickedInterpreterUsername:'',

        }
    }

    componentWillMount() {
        console.log(this.props.match.params.username);
        axios.get("http://localhost:8888/CardinalCC/public/user/Interpreters").then((response) => {
            //change zipcode to zip
            console.log(response.data);
            this.setState({interpreterInfo: response.data});
        });
    }
    onSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8888/CardinalCC/public/user/Register",{username:this.state.username}).then
        ((response)=> {
                this.setState({interpreterSearchResults: response.data})
            }
        )
    }
//will be the onclick callback for the buttons by the interpreters names 
    // requestInterpreter(userName){
    //     axios.post('#',{userName: userName}).then((response)=> {
    //             console.log('sup');
    //         }
    //     )
    // }

    testUserLength(){
        if(this.state.userInfo > 0){
            var idValue = 0;
            return(
                <div>
                    <h1>Your search yeilded multiple results. Please select the appropriate choice or click the advanced search link bellow.</h1>
                    <ul>
                        {this.state.interpreterInfo.map((interpreter) => {
                           return( <li>
                                <h1>{interpreter.userName}</h1>
                                <button id={idValue} value={this.state.userName} onClick={this.requestInterpreter(document.getElementById(idValue).value)}>
                                    Request This Interpreter
                                </button>
                            </li>
                           );
                           idValue+=1;
                        })
                        }
                    </ul>
                </div>
            );
        }
        else{
            var value=this.state.userName;
            return(
                <div>
                    <h1>{this.state.userInfo.userName}</h1>
                    <button onClick={this.requestInterpreter(value)}>Request This Interpreter</button>
                </div>
            );
        }
    }
    convertAddress(address){
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+GOOGLE_MAPS_API_KEY).then((response) => {
            //change zipcode to zip
            console.log(response.data);
    });
    }

    addressTest(){
        interpreters.interpreters.map((interpreter)=>{
            var address = (this.convertAddress(interpreter.interpreterAddress));
            console.log(address);
            }
        )
    }
    clickedUserInfo(value){
        this.setState({clickedInterpreterUsername:value});
        document.getElementById('username').value = this.state.clickedInterpreterUsername
        console.log(this.state.clickedInterpreterUsername);
    }

    static defaultProps = {
        center: [59.838043, 30.337157],
        zoom: 9,
        greatPlaces: [
            {id: 'A', lat: 59.955413, lng: 30.337844},
            {id: 'B', lat: 59.724, lng: 30.080}
        ]
    };
    render() {
            // const places = this.props.greatPlaces
            //     .map(place => {
            //         const {id, ...coords} = place;
            //
            //         return (
            //             <InterpreterMarker
            //                 key={id}
            //                 {...coords}
            //                 text={id}
            //                 // use your hover state (from store, react-controllables etc...)
            //               />
            //         );
            //     });

            return (
            <div style={{display:"flex", justifyContent:'center', flexDirection:'column',  alignItems:'center'}}>
            <div style={{width:'50vw', height:'50vh'}}>
                <h1 style={{textAlign:'center'}}>map</h1>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                onChildMouseEnter={this._onChildMouseEnter}
                onChildMouseLeave={this._onChildMouseLeave}

                hoverDistance={K_SIZE / 2}
            >
                {/*{interpreters.interpreters.map((interpreter)=>{*/}
                    {/*this.convertAddress(interpreter.interpreterAddress)}).then((response)=>{*/}
                    {/*<InterpreterMarker*/}
                        {/*lat={response.results[0].geometry.location.lat}*/}
                        {/*lng={response.results[0].geometry.location.lng}/>*/}
                {/*})}*/}
                <InterpreterMarker
                    lat={60}
                    lng={22}
                    getUserInfo = {this.clickedUserInfo.bind(this)}
                    userName={'bob'}
               />
                <ClientMarker
                    lat={60}
                    lng={22}/>
            </GoogleMapReact>
            </div>
                <form onSubmit={(e)=>this.onSubmit(e)}>
                    <h1 style={{textAlign:'center', marginTop:'200px'}}>Search Interpreter</h1>
                    <input id="username" style={{width: "200px", marginTop: '30px'}} type="text" onChange={(e)=>{this.setState({interpreterUsername: e.target.value})}} />
                    <input className="button" type="submit" value="submit" style={{marginTop:"40px"}}/>
                </form>

                {
                    this.state.userInfo &&
                        this.testUserLength()
                }
                <button onClick={this.onClick}>test</button>



            </div>
        );
    }
}

