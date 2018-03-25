import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';


export default class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Welcome to Cardinal Communicate</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec dolor in diam ultrices cursus. Nam ullamcorper velit at lacus faucibus, vitae molestie velit tempor.
                    Donec id lorem vel lacus rutrum elementum. Suspendisse imperdiet bibendum lacus, eget pretium lorem posuere vitae. Duis aliquet, mauris vel iaculis fringilla, orci orci ultricies orci, vel egestas elit felis eget ligula.
                    In varius tortor sit amet nulla imperdiet, nec placerat massa egestas. Integer mollis ligula vitae justo volutpat convallis ac eu dolor. Aenean tincidunt sodales venenatis. Duis mollis porta arcu, eu convallis urna dapibus in.
                    Pellentesque consectetur dolor urna. Integer nec bibendum dolor. Praesent sodales maximus mi, sit amet consectetur dui molestie et. Etiam vitae commodo sapien. Fusce tincidunt lorem sed dolor ultricies, non pellentesque nibh suscipit.
                    Integer ac porta leo, quis rutrum eros. Sed nulla est, egestas nec lorem ac, ultrices condimentum felis.

                    Cras convallis luctus elit, quis luctus mi accumsan eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nam ultricies, leo sit amet rhoncus tempus, neque nulla viverra arcu, sed pulvinar dolor sem ut turpis. Duis interdum sed nulla sodales sollicitudin.
                    Aliquam dictum felis et auctor bibendum. Donec magna urna, porta ac volutpat eget, finibus pharetra mauris. Nunc gravida lorem enim. Nam odio ligula, viverra ac pretium quis, ornare a ligula.
                    Cras justo mauris, euismod eget turpis nec, faucibus pulvinar metus. In hac habitasse platea dictumst. Integer in nulla vitae sapien feugiat efficitur eu a diam. Pellentesque eu justo vel libero rhoncus ultrices.
                </p>
                <Link to={'/Register'}>Register</Link>
                <Link to={'/Login'}>Login</Link>
            </div>
        );
    }
}