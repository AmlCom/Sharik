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
      Loggedin: false,
      isTeacher: ''
    }
  }

  componentDidMount() {
    if (this.state.isTeacher === '') {
    var is = prompt('Please enter your profession', 'teacher, or student')
    }
    axios.post('/isStudent', {isStudent: is}).then(() => { })
    axios.get('/auth/checkLogging').
      then((x) => {
        console.log('356', x.data);
        if (x.data.email) {
          var isteacher = x.data.isTeacher
          // console.log('yahya',yahya)
          this.setState({
            Loggedin: true,
            isTeacher: isteacher
          })

        } else {
          this.setState({
            Loggedin: false
          })
        }
      })
      
  }


  render() {
    console.log('Yahye isTeacher', this.state.isTeacher)
    console.log('this is islogin', this.state.Loggedin)
    const { classes } = this.props;
    if (!this.state.Loggedin) {
      return (
        <div>
          <div style={{ height: '100%' }}>
            <Nav />
          </div>
          <div>
            <br/>
            <h1>Loading.......</h1>
          </div>
        </div>
      )
    } else if (this.state.Loggedin && this.state.isTeacher) {
      return (
        <div>
          <div style={{ height: '100%' }}>
            <Nav log={this.state.Loggedin} />
          </div>
          <React.Fragment>
            <Redirect to="/profile" />
          </React.Fragment>
        </div>
      );
    } else if (this.state.Loggedin && !this.state.isTeacher) {
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