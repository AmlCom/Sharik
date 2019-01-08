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

class Teacher extends Component {
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
            password: '',
            previousComments: '',
            comment: '',
            studentName: ''
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((x) => {
                console.log('321', x.data);
                if (x.data) {
                    console.log(this)
                    this.setState({
                        Loggedin: true,
                        student_id: x.data._id,
                        studentName: x.data.firstname
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


        axios.post('/get/specTeacher', { name: this.props.location.state.teacher.firstname })
        .then((res) => {
            this.setState({
                previousComments: res.data.comments
            })
        })
        .catch((err) => {
            console.log(err)
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

    comment = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    submitComment = () => {
        console.log('kkkkkk', this.props.location.state.teacher.comments)

        if (this.state.comment === '') {
            console.log('please write comment')
        } else {

            var obj = {
                madeby: this.state.studentName,
                comment: this.state.comment,
                teacherName: this.props.location.state.teacher.firstname
            }

            let made = false;
            for (var i = 0; i < this.state.previousComments.length; i++) {
                if (this.state.previousComments[i].madeby === this.state.studentName) {
                    made = true
                }
            }
            if (!made) {

                let comments = this.state.previousComments
                console.log('comments',comments)

                comments.push(obj)
                axios.post('/get/comment', { comment: comments })
                    .then((res) => {
                        console.log('from ', res)
                        this.setState({
                            comment: res.data.comments
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            } else {
                alert('you already made your comment')
            }
            




            // axios.post('/get/specTeacher', { name: this.props.location.state.teacher.firstname })
            //     .then((res) => {
            //         console.log('balabalabala', res)
            //         var made = false
            //         for (var i = 0; i < res.data.comments.length; i++) {
            //             if (res.data.comments[i].madeby === this.state.studentName) {
            //                 made = true
            //             }
            //         }
            //         if (!made) {

            //             let comments = res.data.comments

            //             comments.push(obj)
            //             axios.post('/get/comment', { comment: comments })
            //                 .then((res) => {
            //                     console.log('from ', res)
            //                     this.setState({
            //                         comment: res.data.comments
            //                     })
            //                 })
            //                 .catch((err) => {
            //                     console.log(err)
            //                 })

            //         } else {
            //             alert('you already made your comment')
            //         }


            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })


            //  this.props.location.state.teacher.comments.push(obj)
            //  console.log('afterpush',this.props.location.state.teacher.comments)
            // axios.post('/get/comment',{comment:this.props.location.state.teacher.comments})
            // .then((res) => {
            //     console.log('from ',res)
            // })
            // .catch((err) => {
            //     console.log(err)
            // })


        }
    }

    render() {
        // console.log('doestheTeacher has comments', this.props.location.state.teacher)
        // console.log('studentwhomadecomment', this.state.studentName)
        console.log('comment',this.state.comment)
        console.log('previouscomment',this.state.previousComments)
        const { teacher } = this.props.location.state
        console.log('teacher111111hargaysa', teacher)
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
                                    <img src={teacher.image} alt="" />
                                </div>
                                <div className="">
                                    <h4><b>{teacher.firstname} {teacher.lastname}</b></h4>
                                    <p>{this.state.teacherMajor}</p>
                                    <h6>{this.state.info}</h6>
                                    <h4> <span class="badge badge-info">Class price {this.state.price}JD/Hour</span></h4>
                                    <button type="button" className="btn btn-info" onClick={this.addStudent}>Request</button>
                                    <Rate teacher={teacher} />
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
                                    <input type="text" class="form-control" placeholder="Write a comment" onChange={this.comment} />
                                    <div className="input-group-append">
                                        <button className="btn btn-info" type="button" onClick={this.submitComment}>Comment</button>
                                    </div>
                                </div>

                                
                                {this.state.previousComments.map((comment) => {
                                    return (
                                    <div className=''>
                                        <ul className=''><span></span>
                                            <li >
                                                <li className="card commentsCard" >
                                                    <h5 className="card-header"> {comment.madeby}</h5>
                                                    <div className="card-body">
                                                        <p className="card-text"> {comment.comment}</p>
                                                    </div>
                                                </li>
                                            </li>
                                        </ul>
                                    </div>
                                    )
                                    

                                })}
                                




                            </div>
                        </div>
                    </div >
                </div >
            )
        }
    }
}
export default withStyles(styles)(Teacher);




