// React:
// -----

import React, { Component } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import './Student.css'

// AXIOS GET /POST:
// ---------
import axios from 'axios';

// Nav Component:
import Nav from '../Nav'

// 
import Dashboard from './Dashboard/Dashboard.jsx';
import SubjectsList from './SubjectsList/SubjectsList.jsx';
import AddSubject from './AddSubject/AddSubject.jsx';
import Profile from './Profile/Profile.jsx';
import MySchedule from './MySchedule/MySchedule.js';
import MyPayments from './MyPayments/MyPayments.jsx';
import Teachers from '../Teachers/Teachers'
import Button from '@material-ui/core/Button';

// 


// // 


// Material UI:
// -----------

import { withStyles } from '@material-ui/core/styles';

// AppBar, Tab, and Tabs:
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Grid System:
import Grid from '@material-ui/core/Grid';

// Avatar (Img):


// Card (To holde Img with basic Info):
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';



class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTeacher: '',
            avatarImg: 'data:image/jpeg;base64,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',
            tabID: 0,
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((x) => {
                console.log('356', x.data);
                if (x.data.email) {
                    var isteacher = x.data.isTeacher
                    // console.log('yahya',yahya)
                    this.setState({
                        isTeacher: isteacher
                    })

                } else {
                    this.setState({
                        Loggedin: false
                    })
                }
            })
    }

    onTabChange = (event, tabID) => {
        this.setState({ tabID });
    };

    onTabChange = (event, tabID) => {
        this.setState({ tabID });
    };

    render() {
        if (this.state.isTeacher === '') {
            return (
                <div>
                    <br />
                    <h1>Loading.......</h1>
                </div>
            )
        } else if (!this.state.isTeacher) {
            return (
                <div>
                    <div style={{ height: '100%' }}>
                        <Nav />
                    </div>

                        <Grid container spacing={24}>
                            <Grid item xs={12}>

                                <BrowserRouter>
                                    <div className="App">
                                        <div style={{marginTop:'30px'}}>
                                            <Button color="inherit"><Link to='/Student/' style={{ textDecoration: 'none'}}>Dashboard</Link></Button>
                                            <Button color="inherit"><Link to='/Student/SubjectsList' style={{ textDecoration: 'none'}}>Subjects List</Link></Button>
                                            <Button color="inherit"><Link to='/Student/AddSubject'style={{ textDecoration: 'none'}}>Add Subject</Link></Button>
                                            <Button color="inherit"><Link to='/Student/Profile' style={{ textDecoration: 'none'}}>Profile</Link></Button>
                                            <Button color="inherit"><Link to='/studentchedule' style={{ textDecoration: 'none'}}>MySchedule</Link></Button>
                                            <Button color="inherit"><Link to='/Student/MyPayments'style={{ textDecoration: 'none'}} >MyPayments</Link></Button>
                                            <Button color="inherit"><Link to='/Teachers' style={{ textDecoration: 'none'}}>Teachers List</Link></Button>
                                            <Switch>
                                                <Route path='/Student/' exact component={Dashboard} />
                                                <Route path='/Student/SubjectsList' exact component={SubjectsList} />
                                                <Route path='/Student/AddClass' exact component={AddSubject} />
                                                <Route path='/Student/Profile' exact component={Profile} />
                                                <Route path='/studentchedule' exact component={MySchedule} />
                                                <Route path='/Student/MyPayments' exact component={MyPayments} />
                                                <Route path='/Teachers' exact component={Teachers} />
                                            </Switch>
                                        </div>
                                    </div>
                                </BrowserRouter>
                            </Grid>
                        </Grid>
                    </div>  
                 )
        } else {
            return (
                <Redirect to="/profile" />
            )
        }

    }
}

export default Student;


