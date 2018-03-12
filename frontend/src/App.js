import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Profile from './Components/Profile';
//import routes

export default class App extends Component{
    render(){
        return(
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Login" component={Login}/>
              <Route exact path="/Profile" component={Profile}/>
          </Switch>
        );
    }
}