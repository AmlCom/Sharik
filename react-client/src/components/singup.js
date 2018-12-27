import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

// class Signup extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           firstName: '',
//           lastName: '',
//           email: '',
//           password: '',
//           redirectTo: null
//         }
//     }

//     handleChange = (event) => {
//         this.setState({
//           [event.target.name]: event.target.value
//         })
//       }
    
//     handleSubmit = (event) => {
//         if (this.state.firstName === '') {alert('firstName cannot be empty');
//         } else if (this.state.lastName === '') {alert('lastName cannot be empty');
//         } else if (this.state.email === '') {alert('email cannot be empty');
//         } else if (this.state.password === '') {alert('password cannot be empty');
//         } else {
//           event.preventDefault()
//           const validate = {
//             firstName: this.state.firstName,
//             lastName: this.state.lastName,
//             email: this.state.email,
//             password: this.state.password
//           } 
      
//           axios.post('/auth/signup', validate)
//           .then(response => {
//             console.log(response)
//             if (!response.data.error) {
//               console.log('youre good')
//               this.setState({
//                 redirectTo: '/login'
//               })
//             } else {
//               console.log(response.data.error)
//             }
//           })
//         }  
//     }



//     render() {
//         if (this.redirectTo) {
//             return <Redirect to={{ pathname: this.redirectTo }} />
//           }
//         return (
//             <div>
//             <h1>This is the Signup page </h1>
//             <form action="/signup" method="post">
//                 <div>
//                     <label>First name</label>
//                     <input type="text" name="firstName" onChange={this.handleChange}/>
//                 </div>
//                 <div>
//                     <label>Last name</label>
//                     <input type="text" name="lastName" onChange={this.handleChange}/>
//                 </div>
//                 <div>
//                     <label>Email</label>
//                     <input type="email" name="email" onChange={this.handleChange}/>
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input type="password" name="password" onChange={this.handleChange}/>
//                 </div>
                
//                 <div>
//                     <input type="button" onClick={this.handleSubmit} value="signup"/>
//                 </div>
//             </form>
//         </div>
//         )
//     }
// }
// export default Signup;
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
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function Signin(props) {
  const { classes } = props;

  return (
    // <div className={classes.root}>
    //  <Grid container spacing={24}>


    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>


        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">First name</InputLabel>
            <Input user="name" name="first" autoComplete="user" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Last name</InputLabel>
            <Input last="name" name="user" autoComplete="user" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </main>

    
  );
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin);