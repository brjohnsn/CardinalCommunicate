/*import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_MAPS_API_KEY} from '../conf/config';
import ClientMarker from '../Components/ClientMarker';
import InterpreterMarker from '../Components/InterpreterMarker';
import axios from "axios/index";
import interpreters from "../assets/testJson/testInterpreters";

export default class Map extends Component{
    constructor(props){
        super(props);
        this.state={
            interpreterInfo: []
        }
    }
    componentWillMount() {
        console.log(this.props.match.params.username);
        // axios.get("#").then((response) => {
        //     //change zipcode to zip
        //     console.log(response.data);
        //     this.setState({interpreterAddresses: response.data});
        // });
    }
    convertAddress(address){
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+GOOGLE_MAPS_API_KEY).then((response) => {
            //change zipcode to zip
            console.log(response.data);
    });
    }
    static defaultProps = {
        center: {lat: 60, lng: 22},
        zoom: 11
    };
    addressTest(){
        interpreters.interpreters.map((interpreter)=>{
            var address = (this.convertAddress(interpreter.interpreterAddress));
            console.log(address);
            }
        )
    }
    render() {
        return (
            <div style={{width:'100vw', height:'100vh'}}>
                <h1>map</h1>
                <button onClick={(e)=>{this.addressTest()}}>hello</button>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            >
                {interpreters.interpreters.map((interpreter)=>{
                    this.convertAddress(interpreter.interpreterAddress)}).then((response)=>{
                    <InterpreterMarker
                        lat={response.results[0].geometry.location.lat}
                        lng={response.results[0].geometry.location.lng}/>
                })}
                <InterpreterMarker
                    lat={60}
                    lng={22}/>
                <ClientMarker
                    lat={60}
                    lng={22}/>
            </GoogleMapReact>
            </div>
        );
    }
}

*/
