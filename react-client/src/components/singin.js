import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
            test: 'qewry'
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
        then((x) => {
            console.log('SFSF', x);
            if (x.data.googleId) {
                this.setState({
                   isLoggedin: true
                })
            } else {
               this.setState({
                   isLoggedin: false
               })
            }
        })
       }

    render() {
        if (this.state.isLoggedin) {
            return <Redirect to={{ pathname: '/profile', state: { referrer: this.state.test } }} />
        } else {
        return (
            <div>
                <h1>This is the Signin page </h1>
                <form action="/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password"/>
                    </div>
                    <div>
                        <input type="submit" value="Log In"/>
                    </div>
                </form>
                <a href="/auth/google">Sign In with Google</a>
            </div>
        )
        }
    }
}

export default Signin;