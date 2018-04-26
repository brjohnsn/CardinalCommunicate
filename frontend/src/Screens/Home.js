import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import styles from './Home.css'

export default class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const style = {backgroundColor: 'rgb(230,230,230)', borderRadius: '100px', textAlign: 'center', marginLeft: '22%', marginRight: '22%',
        paddingTop: '1%', paddingBottom: '1%'};
        return(
            <div style = {style}>
                <h1>Welcome to Cardinal Communicate!</h1>
                <h2>What we do:</h2>
                <p style = {{marginLeft: '2%', marginRight:'2%'}}>Cardinal Communicate is a quick and easy way to locate American Sign Language interpreters for any situation! We can locate interpreters based on
                    multiple criteria, such as Certification, Location, and Gender. Clients in need of interpreting services can schedule events and notify
                    interpreters of their event. No matter the situation, Cardinal Communicate can help you with all of your Sign Language interpretation needs!
                </p>
                <h3>Please click one of the links below to Register or log into an existing account</h3>
                <Link to={'/Register'}>Register</Link>
                <p></p>
                <Link to={'/Login'}>Login</Link>
            </div>
        );
    }
}