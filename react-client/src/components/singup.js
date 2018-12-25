import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            redirectTo: null
        }
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
    
      handleSubmit = (event) => {
        event.preventDefault()
        const validate = {
          username: this.state.username,
          password: this.state.password
        } 
    
        axios.post('/auth/signup', validate)
        .then(response => {
          console.log(response)
          if (!response.data.error) {
            console.log('youre good')
            this.setState({
              redirectTo: '/login'
            })
          } else {
            console.log(response.data.error)
          }
        })
      }



    render() {
        if (this.redirectTo) {
            return <Redirect to={{ pathname: this.redirectTo }} />
          }
        return (
            <div>
            <h1>This is the Signup page </h1>
            <form action="/signup" method="post">
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" onChange={this.handleChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={this.handleChange}/>
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="ConfirmPassword" onChange={this.handleChange}/>
                </div>
                <div>
                    <input type="button" onClick={this.handleSubmit} value="signup"/>
                </div>
            </form>
        </div>
        )
    }
}

export default Signup;