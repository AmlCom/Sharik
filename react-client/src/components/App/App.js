import React, { Component } from 'react';
import Home from '../home/home';
import Profile from '../profile'
import Signin from '../singin'
import Signup from '../singup'
import HomePage from '../HomePage'
import About from '../about'
import Contact from '../Contact/Contact'
import Nav from '../Nav'
import Teachers from '../Teachers/Teachers';
import Teacher from '../Teachers/Teacher';
import CreateTeacher from '../CreateTeacher'
import Search from '../search'
import Student from '../Students/Student.js'
import VideoComponent from '../video/VideoComponent'


import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import TabContainer from '../Footer/footer'
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


         <div style={{ height: '100%' }}>
            <Nav />
         </div>
           
           

            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/HomePage' exact component={HomePage} />
              <Route path='/about' exact  component={About} />
              <Route path='/Contact' exact  component={Contact} />
              <Route path='/Signup' exact  component={Signup} />
              <Route path='/signin' exact component={Signin} />
              <Route path ='/teachers' exact component = {Teachers} />
              <Route path='/Profile' exact component={Profile} />
              <Route path='/Teacher' exact component={Teacher}/>
              <Route path= '/CreateTeacher' exact component={CreateTeacher}/>
              <Route path='/search' exact component={Search}/>
              <Route path='/Student' exact component={Student}/>
              <Route path='/video' exact component={VideoComponent} />
            </Switch>
          </div>
        </div>
       
      </BrowserRouter>
    )
  }
}
export default App;