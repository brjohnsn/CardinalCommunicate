import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Profile from './Screens/Profile';
import Register from './Screens/Register';
import Header from './Components/Header';
import Search from './Screens/Search';
import Map from './Screens/Map';
import Event from './Components/Event';
import Settings from './Screens/Settings';





//import routes

export default class App extends Component{
    render(){
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Login" component={Login}/>
                    <Route exact path="/Register" component={Register}/>
                    <Route exact path="/Profile" component={Profile}/>
                    <Route exact path="/Settings" component={Settings}/>
                    <Route exact path ="/Search" component={Search}/>
                    <Route exact path ="/Map/:userAddress" component={Map}/>
                    <Route exact path ="/Event" component={Event}/>
            </Switch>
            </div>
        );
    }
}