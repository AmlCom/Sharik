import React, { Component } from 'react';

class Student extends Component {
       constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }    
  
    render(){
  
    return (
        <div>
            <h1>Student Page</h1>
        </div>

    )
  }
}
  
  export default Student