import React, { Component } from 'react';
import { storage } from '../firebase/index'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Profile.css'
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


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loggedin: false,
            email: '',
          password: '',
            image: "https://vignette.wikia.nocookie.net/kalbo-kinis-kintab/images/c/c5/Facebook-default-no-profile-pic.jpg/revision/latest/scale-to-width-down/480?cb=20131120043048",
            teacherName: "",
            teacherMajor: "",
            info: "",
            price: "",
            isTeacher:false
        }
    }
    
    componentDidMount() {
        axios.get('/auth/checkLogging').
        then((response) => {
            console.log('hello world')
         console.log('balabal', response.data.passport.user.isTeacher);
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

    uploadImage = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    submitImage = () => {
        var image = this.state.image
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed', (snapshot) => {

        }, (error) => {
            console.log(error)
        }, () => {
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log('url', url)
                this.setState({
                    image: url
                })
                //request to the database update the profile picture
            })
        });
    }
// }, (error) => {
//     console.log(error)
// }, () => {
//     storage.ref('images').child(image.name).getDownloadURL().then(url => {
//         console.log('url',url)
//         this.setState({
//           image:url
//         })
//      //request to the database update the profile picture
//     })
// });


//     }


    render(){
        const { classes } = this.props;
        if (!this.state.Loggedin) {
            return (
                <div>
                    <div style={{ height: '100%' }}>
                    {/* <Nav /> */}
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
        } else if(this.state.isTeacher && this.state.Loggedin) {
        console.log('state',this.state.image)
    return (
        <div>
            <div style={{ height: '100%' }}>
            {/* <Nav log={this.state.Loggedin}/> */}
            </div>
                <div className="container">
                    <div className="row">
                        <div className="pic col-md-3"  >


                            <img src={this.state.image} alt="" className="rounded" />
                            <br />
                            <br />

                            <div className="input-group mb-3">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.uploadImage} />
                                    <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <button className="input-group-text" id="inputGroupFileAddon02" onClick={this.submitImage}>Upload</button>
                                </div>
                            </div>


                            <div className="list-group">
                                <a className="list-group-item">
                                    <span className="glyphicon glyphicon-cog" aria-hidden="true"></span> <h4> {this.state.teacherName}</h4>
                                    <div><h5 className="font-weight-light font-weight-bold "> {this.state.teacherMajor} teacher </h5></div>
                                    <div><h6 className="font-weight-light font-weight-bold ">{this.state.info}</h6></div>
                                    <h4> <span class="badge badge-info">Class price {this.state.price}JD/Hour</span></h4>
                                    <div></div>
                                </a>
                            </div>

                            <br/>

                            <div className=''>
                                        <a href="" class="list-group-item d-flex justify-content-between align-items-center">
                                            Messages <span class="badge badge-primary badge-pill">14</span>
                                        </a>

                                        <a href="./Teacher" class="list-group-item d-flex justify-content-between align-items-center">
                                            Comments  <span class="badge badge-primary badge-pill">2</span>
                                        </a>
                                    

                                        <a href="./lectures" class="list-group-item d-flex justify-content-between align-items-center">
                                        lectures <span class="badge badge-primary badge-pill">1</span>
                                        </a>
                                    </div>

    <br/>

                        </div>
                        <div className="col-md-9">


                            <div className="panel panel-default">
                                <div className="panel-heading ">
                                    <h3 className="panel-title border border-success">Your requests</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="row">

                                    </div>
                                    <br />
                                    <table className="table table-striped table-hover">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td>Name 1</td>
                                            <td>@gmail.com</td>
                                            <td><a className="btn btn-success" href="">Accept</a> <a className="btn btn-danger" href="#">Reject</a></td>
                                        </tr>
                                        <tr>
                                            <td>Name 2</td>
                                            <td>@yahoo.com</td>
                                            <td><a className="btn btn-success" href="">Accept</a> <a className="btn btn-danger" href="#">Reject</a></td>
                                        </tr>
                                        <tr>
                                            <td>Name 3</td>
                                            <td>@yahoo.com</td>
                                            <td><a className="btn btn-success" href="">Accept</a> <a className="btn btn-danger" href="#">Reject</a></td>
                                        </tr>
                                        <tr>
                                            <td>Name 4</td>
                                            <td>@gmail.com</td>
                                            <td><a className="btn btn-success" href="">Accept</a> <a className="btn btn-danger" href="#">Reject</a></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <br />

                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
        <Redirect to="/homePage" />
        )
    }
} 
}
export default withStyles(styles)(Profile);
