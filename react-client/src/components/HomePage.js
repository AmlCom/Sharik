import withRoot from './Categories/withRoot';
import Nav from './Nav'

// --- Post bootstrap -----
import React, { Component } from 'react';
import ProductCategories from './Categories/ProductCategories';
import { homedir } from 'os';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTeacher: ''
    }
  }

  componentWillMount() {
    axios.get('/auth/checkLogging').
      then((x) => {
        console.log('356', x.data);
        if (x.data.firstname) {
          var isteacher = x.data.isTeacher
          // console.log('yahya',yahya)
          this.setState({
            isTeacher: isteacher
          })
        }
      })
  }

  render() {
    console.log('Yahye isTeacher', this.state.isTeacher)
    console.log('this is islogin', this.state.Loggedin)
    if (this.state.isTeacher === '') {
      return (
        <div>
          <br/>
        <h1>Loading.......</h1>
        </div>
        // <Redirect to="/signin" />
      )
    } else if (this.state.isTeacher) {
      return (
        <div>
          <div style={{ height: '100%' }}>
              <Nav/>
          </div>
          <React.Fragment>
            <Redirect to="/profile" />
          </React.Fragment>
        </div>
      );
    } else if (!this.state.isTeacher) {
      return (
        //browserHistory.push('/student')
        // <React.Fragment>

        //   <Student />

        // </React.Fragment>
        <Redirect to="/student" />
      )
    }
  }
}



export default HomePage;