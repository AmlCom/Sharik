import React, { Component } from 'react';
import Slideshow from '../slideshow'
import { Divider } from '@material-ui/core';
import Nav from '../Nav'
import axios from 'axios';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Loggedin: false,
        }
    }
  
    componentDidMount() {
        axios.get('/auth/checkLogging').
        then((x) => {
            console.log('356', x);
            if (x.data) {
              console.log(this)
                this.setState({
                   Loggedin: true
                })
            } else {
               this.setState({
                   Loggedin: false
               })
            }
        })
      }

    render() {
        return (
        <div>
            <div style={{ height: '100%' }}>
                {/* <Nav log={this.state.Loggedin}/> */}
            </div>
            {/* <Slideshow /> */}
        </div>
        )
    }
}

export default Home;
