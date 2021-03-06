import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_MAPS_API_KEY} from '../conf/config';
import ClientMarker from '../Components/ClientMarker';
import InterpreterMarker from '../Components/InterpreterMarker';
import axios from "axios/index";
import interpreters from "../assets/testJson/testInterpreters";
import {K_SIZE} from './hoverStyles';
import controllable from 'react-controllable'
import {Link} from 'react-router-dom';



export default class Map extends Component{
    constructor(props){
        super(props);
        this.state={
            interpreterInfo:[],
            interpreterSearchResults:[],
            clickedInterpreterUsername:'',
            userCordinates:[],
            eventId:'',
            clientCoordinates:[]

        }
    }

    componentWillMount() {
        this.getClientCoordinates();
        axios.post("http://localhost:8888/CardinalCC/public/user/Interpreters")
            .then((response) => {
            //change zipcode to zip
            this.setState({interpreterInfo: response.data})
        }).then(async()=>{
            var test = await this.generateLatLong(this.state.interpreterInfo);
            this.setState({userCordinates: test})

            }

        ).then(async()=>{
            var cords = await this.getClientCoordinates()
            this.setState({clientCoordinates: cords[0].coordinates})
            console.log(this.state.clientCoordinates)
        })
    }
    async getClientCoordinates(){
        var address = [this.props.match.params.userAddress]
        var clientCords = await this.generateLatLong(address);
        return clientCords
    }
    onSubmit(e){
        e.preventDefault();
        axios.post("http://localhost:8888/CardinalCC/public/user/Search",{ gender:'', state:'', certification:'', username:this.state.clickedInterpreterUsername}).then
        ((response)=> {
                this.setState({interpreterSearchResults: response.data})
            }
        ).then(()=> console.log(this.state.interpreterSearchResults)
        )
    }
//will be the onclick callback for the buttons by the interpreters names 
    requestInterpreter(username){
        axios.post('http://localhost:8888/CardinalCC/public/user/request-interpreter',{interpreterUsername: username, eventId: this.state.eventId}).then((response)=> {
                console.log(response);
            }
        )
    }

    testUserLength(){
            return(
                <div style = {{textAlign: 'center'}}>
                    <h1>Username: {this.state.interpreterSearchResults[0].username}</h1>
                    <input id='state' style = {{display: 'block'}} id="username" style={{width: "200px", marginTop: '30px'}} type="text" onChange={(e)=>{this.setState({eventId: e.target.value})}}></input>
                    <p></p>
                    <label id = "state" style = {{display: 'bl'}}>Please type your event id above.</label>
                    <p></p>
                    <button style = {{height: "50px", fontSize: '15px', borderRadius: "50px", width: '200px'}} onClick={this.requestInterpreter(this.state.clickedInterpreterUsername)}>Request This Interpreter</button>
                    <p></p>
                </div>

            );
        }

     async convertAddress(address){

        var latLong =  await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+GOOGLE_MAPS_API_KEY);
        console.log("waited for", latLong);
        try{
            return latLong.data.results[0].geometry.location;
        }catch(e){
            return null;
        }

    }

      async generateLatLong(adresses_list){

            var newArray = [];
            for(var i = 0; i < adresses_list.length; i++){
                var coordinates =  await this.convertAddress(adresses_list[i].address)
                console.log("coordinates", coordinates)
                newArray.push({
                    username: adresses_list[i].username,
                    coordinates: coordinates
                })

            }
            return newArray;
    }

    clickedUserInfo(value){
        this.setState({clickedInterpreterUsername:value});
        document.getElementById('username').value = this.state.clickedInterpreterUsername

    }
    static defaultProps = {
        center: [39.7701723, -94.8397698],
        zoom: 3,
        greatPlaces: [
            {id: 'A', lat: 59.955413, lng: 30.337844},
            {id: 'B', lat: 59.724, lng: 30.080}
        ]
    }


    render() {
        console.log(this.state.clientCoordinates.lat)

            return (
            <div style={{display:"flex", justifyContent:'center', flexDirection:'column',  alignItems:'center'}}>
            <div style={{width:'50vw', height:'50vh'}}>
                <h1 style={{textAlign:'center'}}>map</h1>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                hoverDistance={K_SIZE / 2}>

                {
                    this.state.userCordinates &&
                    this.state.userCordinates.map((marker)=>{
                        console.log(marker.username);
                        if(marker.coordinates != null){
                        return(
                            <InterpreterMarker
                                lat={marker.coordinates.lat}
                                lng={marker.coordinates.lng}
                                getUserInfo = {this.clickedUserInfo.bind(this)}
                                username = {marker.username}/>
                        )}
                    })
                }
                <ClientMarker
                    lat={this.state.clientCoordinates.lat}
                    lng={this.state.clientCoordinates.lng}
                />
            </GoogleMapReact>
            </div>
                <form onSubmit={(e)=>this.onSubmit(e)} style = {{textAlign:'center'}}>
                    <h1 style={{textAlign:'center', marginTop:'200px'}}>Search Interpreter</h1>
                    <input id="username" style={{width: "200px", textAlign: 'center'}} type="text" onChange={(e)=>{this.setState({clickedInterpreterUsername: e.target.value})}} />
                    <p></p>
                    <input className="button" type="submit" value="submit" style={{}}/>
                </form>
                <Link to={"/Profile"} style = {{paddingBottom: '3%', paddingTop: '3%'}}>Back to Profile</Link>

                {
                    this.state.interpreterSearchResults.length > 0 &&
                    this.testUserLength()
                }
                {/*<button onClick={this.generateLatLong(this.state.interpreterInfo)}>Id love it if you clicked me</button>*/}

            </div>
        );
    }
}

