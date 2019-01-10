import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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


class Singin extends Component {
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
          console.log('356', x);
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
  
      axios.post('/auth/signin', check)
      .then(response => {
        if (response.data) {
          {localStorage.setItem("login", true)}

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

  render(){
    const { classes } = this.props;
    if (this.state.Loggedin) {
      return <Redirect to={{ pathname: '/HomePage', state: { referrer: this.state.test } }} />
  } else {
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
            <a href="/auth/google"><button style={{'backgroundColor':'#ea4335', 'color':'white', 'width': '350px', 'margin':'10px'}} className={'btn'}><i  className="fab fa-google-plus-g"></i> Signin With Google</button></a>
            <a href="/auth/facebook"><button style={{'backgroundColor':'#3b5998', 'color':'white', 'width': '350px', 'margin':'px'}} className={'btn'}> <i className="fab fa-facebook-square"></i> Signin With Facebook</button></a>
          </Paper>
        </main>
      </div>
    )
    };
}
}

export default withStyles(styles)(Singin);