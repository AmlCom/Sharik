import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const styles = {
  root: {
    flexGrow: 1,
    background: "lightblue"
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>

      <div className="aboutTxt">
      {/* <br></br> */}
			<h1 class="h"> Welcome to Sharik </h1>
			<br></br>
			<h4>The leading global marketplace for learning and instruction.</h4>
			<h4>By connecting students all over the world to the best instructors,
         Sharik is helping individuals reach their goals and pursue their dreams</h4>
			</div>
			<br></br>
			<h2>The Owners of the Sharik </h2>
			<div class="aboutowners">
			<li> Batool Al-Issa</li>
			<li> Yahya Rashid </li>
			<li> Amjad Hasnawi </li>
      <li> Ashraf Al-sheikh </li>
			<li> Mustaf Dirie</li>
			</div>
      <h1>Our global reach</h1>
      <h4>Sharik is the leading global marketplace for teaching and learning, 
        connecting students everywhere to the world’s best instruction anywhere.</h4>
    </div>
    
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);