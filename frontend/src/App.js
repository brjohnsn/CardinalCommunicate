import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Header from './Components/Header';


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