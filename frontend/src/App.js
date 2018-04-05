import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Profile from './Screens/Profile';
import Register from './Screens/Register';
import Header from './Components/Header';
import Settings from './Components/Settings';
import Search from './Components/Search';
import Map from './Components/Map';
import Event from './Components/Event';




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
            </Switch>
            </div>
        );
    }
}