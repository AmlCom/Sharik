import React, { Component } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav'
import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';
import Dashboard from './Dashboard/Dashboard.jsx';
import SubjectsList from './SubjectsList/SubjectsList.jsx';
import AddSubject from './AddSubject/AddSubject.jsx';
import Profile from './Profile/Profile.jsx';
import MySchedule from './MySchedule/MySchedule.jsx';
import MyPayments from './MyPayments/MyPayments.jsx';

import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },//
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Student extends Component {
	constructor(props) {
		super(props);
		this.state = {
          Loggedin: false,
          isTeacher:false,
		}
	}

	componentDidMount() {
    axios.get('/auth/checkLogging').
    then((response) => {
        console.log('hello world')
    //  console.log('balabal', response.data.passport.user.isTeacher);
      if (response.data.passport) {
        this.setState({
          Loggedin: true,
          isTeacher:response.data.passport.user.isTeacher
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
    
        axios.post('/auth/signin', check)
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
    const { classes } = this.props;
    if (!this.state.Loggedin) {
      return (
        <div>
          <div style={{ height: '100%' }}>
              <Nav />
          </div>
          <main className={classes.main}>
          
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
                </FormControl>
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
                >
                  Sign in
                </Button>
              </form>
              <a href="/auth/google"><button className={'btn btn-success'}>Sign In with Google</button></a>
              <a href="/auth/facebook"><button className={'btn btn-danger'}>Login with Facebook</button></a>
            </Paper>
          </main>
        </div>
      )
    } else if(this.state.Loggedin && !this.state.isTeacher) {
      return (
        <div>
           <div style={{ height: '100%' }}>
              <Nav log={this.state.Loggedin}/>
          </div>
          <h1>Student Page</h1>
          <BrowserRouter>
            <div className="App">
              <div>
              <Button color="inherit"><Link to='/Student/'>Dashboard</Link></Button>
              <Button color="inherit"><Link to='/Student/SubjectsList'>Subjects List</Link></Button>
              <Button color="inherit"><Link to='/Student/AddSubject'>Add Subject</Link></Button>
              <Button color="inherit"><Link to='/Student/Profile'>Profile</Link></Button>
              <Button color="inherit"><Link to='/Student/MySchedule'>MySchedule</Link></Button>
              <Button color="inherit"><Link to='/Student/MyPayments'>MyPayments</Link></Button>

                <Switch>
                  <Route path='/Student/' exact component={Dashboard} />
                  <Route path='/Student/SubjectsList' exact component={SubjectsList} />
                  <Route path='/Student/AddClass' exact component={AddSubject} />
                  <Route path='/Student/Profile' exact component={Profile} />
                  <Route path='/Student/MySchedule' exact component={MySchedule} />
                  <Route path='/Student/MyPayments' exact component={MyPayments} />
                </Switch>
              </div>
            </div>

          </BrowserRouter>

        </div>

      )
    }else {
      return (
      <Redirect to="/homePage" />
      )
    }
	}
}

export default withStyles(styles)(Student);

