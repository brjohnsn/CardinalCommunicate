import React, {Component} from 'react';

export default class InterpreterMarker extends Component {
    constructor(props){
        super(props);
    }
    // onclick function will push to search page and the search page will check to see if the this.props.interpreter
    // field is null after the axios request. If it is then it sets the state of the value that dictates what interpreter is chosen and
    //provides some cue(such as filling out the textbox or dropdown menue for choice) that the interpreter has been chosen
    render() {
        const interpreterPoint={backgroundColor:'red'};
        const interpreterPointHover={backgroundColor:'blue'};
        const style = this.props.hover ? interpreterPoint : interpreterPointHover;
        return(
            <div  style={{width:"20%", height:"20%"}}>
                <img src="http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-Picture.png" style={{height:'30px', width:'30px'}}/>
            </div>
        );
    }
}
