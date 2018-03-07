import React, {Component} from 'react';


export default class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1 style={{textAlign: 'center'}}>Welcome!</h1>
                <p style={{width: "25vw"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc lacus, sodales et justo ut, tempor rutrum sapien. Fusce pellentesque sem at egestas tincidunt. Integer rhoncus semper augue vel maximus. Duis a elit est. Sed convallis tincidunt mauris, et ultrices purus tincidunt eget. Nulla facilisi. In euismod gravida lacinia. Curabitur non neque id orci tristique pulvinar. Etiam cursus ante auctor nibh porta lobortis.
                </p>
            </div>
        );
    }
}