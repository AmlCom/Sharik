import withRoot from './Categories/withRoot';
// --- Post bootstrap -----
import React, { Component } from 'react';
import ProductCategories from './Categories/ProductCategories';
import { homedir } from 'os';
import axios from 'axios';


class HomePage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        Loggedin: false,
        email: '',
        password: ''
      }
  }

  componentDidMount() {
    axios.get('/auth/checkLogging').
    then((x) => {
        console.log('356', x.data);
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


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    if (this.state.email === '') {alert('email cannot be empty');
    } else if (this.state.password === '') {alert('password cannot be empty');
    } else {
      event.preventDefault()
      const check = {
        email: this.state.email,
        password: this.state.password
      } 
  
      axios.post('/asd', check)
      .then(response => {
        console.log('ert', response.data)
        if (response.data) {
          console.log('ezvfdgf')

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
  }

  render() {
    if (!this.state.Loggedin) {
      return (
          <div>
              <h1>This is the Signin page </h1>
              <form action="/login" method="post">
                  <div>
                      <label>Email address:</label>
                      <input type="text" name="email" onChange={this.handleChange}/>
                  </div>
                  <div>
                      <label>Password:</label>
                      <input type="password" name="password" onChange={this.handleChange}/>
                  </div>
                  <div>
                      <input type="button" value="Log In" onClick={this.handleSubmit}/>
                  </div>
              </form>
              <a href="/auth/google" ><button className={'btn btn-success'}>Sign In with Google</button></a>
              <a href="/auth/facebook" ><button className={'btn btn-danger'}>Sign In with Facebook</button></a>
          </div>
      )
  } else {
    return (
      <React.Fragment>

        <ProductCategories />

      </React.Fragment>
    );
  }
  }
}



export default withRoot(HomePage)