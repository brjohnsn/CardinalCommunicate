import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {GOOGLE_MAPS_API_KEY} from '../conf/config';
import ClientMarker from '../Components/ClientMarker';
import InterpreterMarker from '../Components/InterpreterMarker';
import axios from "axios/index";

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
    convertAddress(){
        let address = '113 N. Redwood, Muncie IN 47304';
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key="+GOOGLE_MAPS_API_KEY).then((response) => {
            //change zipcode to zip
            console.log(response.data);
    });
    }
    static defaultProps = {
        center: {lat: 60, lng: 22},
        zoom: 11
    };


    render() {
        return (
            <div style={{width:'300px', height:'300px'}}>
                <h1>map</h1>
                <button onClick={(e)=>{this.convertAddress()}}>hello</button>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            >
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


