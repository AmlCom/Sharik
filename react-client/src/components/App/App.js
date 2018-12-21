import React, { Component } from 'react';
import Home from '../home/home';
import Profile from '../profile'
import Signin from '../singin'
import Signup from '../singup'
import HomePage from '../HomePage'
import Nav from '../Nav'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import TabContainer from '../Footer/footer'



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
            {/* <div style={{ marginTop: '100px' , position: "fixed", width:'100%'}}>
            <TabContainer/>
            </div> */}
           

            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/HomePage' exact component={HomePage} />
              <Route path='/Signup' exact  component={Signup} />
              <Route path='/signin' exact component={Signin} />
              <Route path='/profile' exact component={Profile} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    )
  }
}
export default App;