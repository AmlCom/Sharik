import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom'
import  {InputBase } from '@material-ui/core'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Nav extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      Loggedin: false,
    }
  }
 
  componentDidMount() {
    axios.get('/auth/checkLogging').
    then((res) => {
        if (res.data) {
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

  logOut = () => {
    axios.get('/auth/logout').then(() => {
      window.location.assign("/");
        })
  }

  render() {
    {console.log('asdsa3', this.props.log)}
    const { classes } = this.props;
    if (this.props.log) {
      return (
          <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to= '/'>Home</Link>
              </Typography>
              {/* <Button color="inherit">
              <Link to ='/Student'>Student</Link>
              </Button> */}
              <a href='#' onClick={this.logOut}><Button color="inherit">Logout</Button></a>
              <Link to ='/contact'><Button color="inherit">Contact</Button></Link>
              <Link to ='/about'><Button color="inherit">About</Button></Link>
                {/* <Button color="inherit">
                <InputBase  placeholder="  Search…" style= {{ backgroundColor:"white"}} />
                <Button className={classes.button} variant="contained" color="inherit"><Link to ='/search'><i class="fa fa-search"></i></Link></Button>
            
              </Button> */}
            </Toolbar>
          </AppBar>
        </div>
      )
    } else {
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to= '/'>Home</Link>
              </Typography>
              {/* <Button color="inherit">
              <Link to ='/Student'>Student</Link>
              </Button> */}
            
              <Link to='/signin'> <Button color="inherit">Signin </Button></Link>
              <Link to ='/signup'><Button color="inherit">Signup</Button></Link>
              <Link to ='/contact'><Button color="inherit">Contact</Button></Link>
              <Link to ='/about'><Button color="inherit">About</Button></Link>
              
                {/* <Button color="inherit">
              
                <InputBase  placeholder="  Search…" style= {{ backgroundColor:"white"}} />
                <Button className={classes.button} variant="contained" color="inherit"><Link to ='/search'><i class="fa fa-search"></i></Link></Button>
            
              </Button> */}
            </Toolbar>
          </AppBar>
        </div>
      )
    }
  };
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);