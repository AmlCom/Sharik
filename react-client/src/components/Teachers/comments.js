import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../Nav'
import './Teacher.css'
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
import Rate from '../Rating'


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

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",
            teacherName: "",
            teacherMajor: "",
            info: "",
            price: "",
            Loggedin: false,
            student_id: '',
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((x) => {
                console.log('321', x);
                if (x.data) {
                    console.log(this)
                    this.setState({
                        Loggedin: true,
                        image:x.data.image,
                        teacherName:x.data.firstname
                    })
                } else {
                    this.setState({
                        Loggedin: false
                    })
                }
            })
        axios.get('/teacher').then((res) => {
            console.log("res", res);
            this.setState({
                image: res.data[0].image,
                teacherName: res.data[0].teacherName,
                teacherMajor: res.data[0].teacherMajor,
                info: res.data[0].info,
                price: res.data[0].price
            })

        }).catch((err) => {
            console.log('hi', err)
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

    addStudent = () => {
        axios.post('/addStudent', {
            teacherEmail: this.props.location.state.teacher.email,
            student_id: this.state.student_id
        })
            .then((response) => {
                alert(response.data)
            })
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
                                    <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} />
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
        } else {

            return (
                <div>
                    <div style={{ height: '100%' }}>
                        <Nav log={this.state.Loggedin} />
                    </div>
                    <div className='teacher'>
                        <div className='row '>
                            <div className="col-md-3 container">
                                    <div className='teacherPic'>
                                        <img src={this.state.image} alt="" />
                                    </div>
                                    <div className="">
                                        <h4><b>{this.state.firstname} </b></h4>
                                        <p>{this.state.teacherMajor}</p>
                                        <h6>{this.state.info}</h6>
                                        <h4> <span class="badge badge-info">Class price {this.state.price}JD/Hour</span></h4>
                                        <button type="button" className="btn btn-info" onClick={this.addStudent}>Request</button>
                                        
                                    </div>
                    </div>

                    <div className="col-md-8 container">
                        <div className='card-header text-white bg-info'>
                            <div className='d-flex flex-column bd-highlight mb-0.5'>
                                <h3>Comments</h3>
                            </div>
                        </div>

                        <br />
                        <div className="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Write a comment"/>
                            <div className="input-group-append">
                                <button className="btn btn-info" type="button">Comment</button>
                            </div>
                        </div>

                        <div className=''>
                           <ul className=''><span>Comments</span>
                                <li >
                                    Hellloooooo
                                </li>
                            </ul>
                        </div>


                        
                    </div>
                </div>
                    </div >
                </div >
            )
        }
    }
}
export default withStyles(styles)(Comments);




