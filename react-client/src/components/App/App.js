import React, { Component } from 'react';
import Home from '../home/home';
import Profile from '../profile'
import Signin from '../singin'
import Signup from '../singup'
import About from '../about'
import Contact from '../contact'
import Nav from '../Nav'
import Footer from '../Footer/footer'
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


         
          
            <Nav/>
            <Switch>

              <Route path='/' exact component={Home} />
              <Route path='/about' exact  component={About} />
              <Route path='/contact' exact  component={Contact} />
              <Route path='/Signup' exact  component={Signup} />
              <Route path='/signin' exact component={Signin} />
              <Route path='/profile' exact component={Profile} />
            </Switch>
            <Footer />
          </div>

        </div>
      </BrowserRouter>
    )
  }
}
export default App;