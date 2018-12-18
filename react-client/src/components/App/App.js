import React, { Component } from 'react';
import Home from '../home';
import Profile from '../profile'
import Signin from '../singin'
import Signup from '../singup'
import Nav from '../Nav'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div>


         
            <Nav />

            <Switch>
              <Route path='/' exact component={Home} />

              <Route path='/Signup' exact  component={Signup} />
              <Route path='/Login' exact component={Signin} />
              <Route path='/profile' exact component={Profile} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    )
  }
}
export default App;