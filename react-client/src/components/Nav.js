import React from 'react';
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

function Nav(props) {
  const { classes } = props;
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
          <Button color="inherit">
          <Link to='/signin'>Signin</Link>
          </Button>
          <Button color="inherit">
          <Link to ='/signup'>Signup</Link>
          </Button>
          <Button color="inherit">
          <Link to ='/contact'>Contact</Link>
          </Button>
          <Button color="inherit">
          <Link to ='/about'>About</Link>
          </Button>
            {/* <Button color="inherit">
          
            <InputBase  placeholder="  Search…" style= {{ backgroundColor:"white"}} />
            <Button className={classes.button} variant="contained" color="inherit"><Link to ='/search'><i class="fa fa-search"></i></Link></Button>
        
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);