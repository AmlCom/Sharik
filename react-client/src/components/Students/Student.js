// React:
// -----

import React, { Component } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

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
import MySchedule from './MySchedule/MySchedule.jsx';
import MyPayments from './MyPayments/MyPayments.jsx';
import Teachers from '../Teachers/Teachers'

// import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';



// Material UI:
// -----------
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// AppBar, Tab, and Tabs:
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Grid System:
import Grid from '@material-ui/core/Grid';

// Avatar (Img):
import Avatar from '@material-ui/core/Avatar';

// 
import Paper from '@material-ui/core/Paper';

// Card (To holde Img with basic Info):
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



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
                    var yahya = x.data.isTeacher
                    // console.log('yahya',yahya)
                    this.setState({
                        Loggedin: true,
                        isTeacher: yahya
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
        if (this.state.email === '') {
            alert('email cannot be empty');
        } else if (this.state.password === '') {
            alert('password cannot be empty');
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
                            isTeacher: true
                        })
                    } else {
                        this.setState({
                            isTeacher: false
                        })
                    }
                })
        }
    }
    
    onTabChange = (event, tabID) => {
        this.setState({ tabID });
    };

    onTabChange = (event, tabID) => {
        this.setState({ tabID });
    };

    render() {
        const { classes } = this.props;
        if (this.state.isTeacher === '') {
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
                                    <Input id="email" name="email" autoComplete="email" onChange={this.handleChange} />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} />
                                </FormControl>
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
        } else if (this.state.isTeacher) {
            return (
                <Redirect to="/homePage" />
            )
        } else {

            return (
                <div>
                    <div style={{ height: '100%' }}>
                        <Nav log={this.state.Loggedin} />
                    </div>
                    {/* My Code: */}
                    <div>

                        <Grid container spacing={24}>
                            <Grid item xs={12}>

                                <BrowserRouter>
                                    <div className="App">
                                        <div>
                                            <Button color="inherit"><Link to='/Student/'>Dashboard</Link></Button>
                                            <Button color="inherit"><Link to='/Student/SubjectsList'>Subjects List</Link></Button>
                                            <Button color="inherit"><Link to='/Student/AddSubject'>Add Subject</Link></Button>
                                            <Button color="inherit"><Link to='/Student/Profile'>Profile</Link></Button>
                                            <Button color="inherit"><Link to='/Student/MySchedule'>MySchedule</Link></Button>
                                            <Button color="inherit"><Link to='/Student/MyPayments'>MyPayments</Link></Button>
                                            <Button color="inherit"><Link to='/Teachers'>Teachers List</Link></Button>
                                            <Switch>
                                                <Route path='/Student/' exact component={Dashboard} />
                                                <Route path='/Student/SubjectsList' exact component={SubjectsList} />
                                                <Route path='/Student/AddClass' exact component={AddSubject} />
                                                <Route path='/Student/Profile' exact component={Profile} />
                                                <Route path='/Student/MySchedule' exact component={MySchedule} />
                                                <Route path='/Student/MyPayments' exact component={MyPayments} />
                                                <Route path='/Teachers' exact component={Teachers} />
                                            </Switch>
                                        </div>
                                    </div>

                                </BrowserRouter>


                            </Grid>
                        </Grid>


                    </div>

                </div>


            )
        }
    }
}

export default withStyles(styles)(Student);


