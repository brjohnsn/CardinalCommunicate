import React, {Component} from 'react';

export default class InterpreterMarker extends Component {
    constructor(props){
        super(props);
    }
    // onclick function will push to search page and the search page will check to see if the this.props.interpreter
    // field is null after the axios request. If it is then it sets the state of the value that dictates what interpreter is chosen and
    //provides some cue(such as filling out the textbox or dropdown menue for choice) that the interpreter has been chosen
    render() {
        return(
            <div>hey</div>
        );
    }
}
