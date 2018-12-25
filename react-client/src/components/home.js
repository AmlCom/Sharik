import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // invoke = (e) => {
    //     axios.get('/asd').
    //     then((x) =>
    //     {
    //         alert('sdfdsf')
    //     })
    // }

    render() {
        return (
            <div>
                <h1>This is the home page </h1>
            </div>
        )
    }
}

export default Home;