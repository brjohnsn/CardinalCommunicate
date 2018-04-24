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
            interpreterInfo:[],
            interpreterSearchResults:[],
            clickedInterpreterUsername:'',
            userCordinates:[]

        }
    }

    componentWillMount() {
        axios.post("http://localhost:8888/CardinalCC/public/user/Interpreters")
            .then((response) => {
            //change zipcode to zip
            this.setState({interpreterInfo: response.data})
        }).then(async()=>{
            var test = await this.generateLatLong(this.state.interpreterInfo);
            this.setState({userCordinates: test})

            }

        );
    }
    // onSubmit(e){
    //     e.preventDefault();
    //     axios.post("http://localhost:8888/CardinalCC/public/user/Register",{username:this.state.username}).then
    //     ((response)=> {
    //             this.setState({interpreterSearchResults: response.data})
    //         }
    //     )
    // }
//will be the onclick callback for the buttons by the interpreters names 
    // requestInterpreter(userName){
    //     axios.post('#',{userName: userName}).then((response)=> {
    //             console.log('sup');
    //         }
    //     )
    // }

    // testUserLength(){
    //     if(this.state.userInfo > 0){
    //         var idValue = 0;
    //         return(
    //             <div>
    //                 <h1>Your search yeilded multiple results. Please select the appropriate choice or click the advanced search link bellow.</h1>
    //                 <ul>
    //                     {this.state.interpreterInfo.map((interpreter) => {
    //                        return( <li>
    //                             <h1>{interpreter.userName}</h1>
    //                             <button id={idValue} value={this.state.userName} onClick={this.requestInterpreter(document.getElementById(idValue).value)}>
    //                                 Request This Interpreter
    //                             </button>
    //                         </li>
    //                        );
    //                        idValue+=1;
    //                     })
    //                     }
    //                 </ul>
    //             </div>
    //         );
    //     }
    //     else{
    //         var value=this.state.userName;
    //         return(
    //             <div>
    //                 <h1>{this.state.userInfo.userName}</h1>
    //                 <button onClick={this.requestInterpreter(value)}>Request This Interpreter</button>
    //             </div>
    //         );
    //     }
    // }
     async convertAddress(address){

        // var converted = axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+GOOGLE_MAPS_API_KEY).then((response) => {
        //
        //     if(response.data.results.length > 0) {
        //         return response.data.results[0].geometry.location
        //     }
        //
        //
        // });
        // return converted

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
        center: [59.838043, 30.337157],
        zoom: 9,
        greatPlaces: [
            {id: 'A', lat: 59.955413, lng: 30.337844},
            {id: 'B', lat: 59.724, lng: 30.080}
        ]
    };
    render() {
        console.log(this.state.userCordinates)
            return (
            <div style={{display:"flex", justifyContent:'center', flexDirection:'column',  alignItems:'center'}}>
            <div style={{width:'50vw', height:'50vh'}}>
                <h1 style={{textAlign:'center'}}>map</h1>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}


                hoverDistance={K_SIZE / 2}
            >
                {/*{interpreters.interpreters.map((interpreter)=>{*/}
                    {/*this.convertAddress(interpreter.interpreterAddress)}).then((response)=>{*/}
                    {/*<InterpreterMarker*/}
                        {/*lat={response.results[0].geometry.location.lat}*/}
                        {/*lng={response.results[0].geometry.location.lng}/>*/}
                {/*/!*})}*!/*/}
                {
                    this.state.userCordinates.map((marker)=>{
                        console.log(marker.username);
                        if(marker.coordinates != null){
                        return(
                            <InterpreterMarker
                                lat={marker.coordinates.lat}
                                lng={marker.coordinates.lng}
                                getUserInfo = {this.clickedUserInfo.bind(this)}
                                username = {marker.username}
                            />
                        )}
                    })
                }
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
                {/*<button onClick={this.generateLatLong(this.state.interpreterInfo)}>Id love it if you clicked me</button>*/}


            </div>
        );
    }
}

