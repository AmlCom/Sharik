import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  });


  class Search extends React.Component {
    state = {
      name: '',
      result:[]

  
    };
  

   
    handleChange = (event) => {
      console.log('event',event.target.value)
      this.setState({
       // [event.target.name]: event.target.value
       name:event.target.value
      })
    }
    
    handleSubmit = (event) => {
      if (this.state.name === '') {
        alert('name cannot be empty');
      } else {
        event.preventDefault()
        const obj = {
          name: this.state.name,
          
      } 
      
        axios.post('get/teacher', obj)
        .then(response => {
          console.log('ert', response)
       
        }).catch((err)=>{
          console.log('err',err)
        })
      }  
    }
 
    render() {
    
      console.log('mustaf',this.state.name)
      const { classes } = this.props;

      return (
        <div>
        <form className={classes.container} noValidate autoComplete="off" >
  
          
          <TextField
          onChange = {this.handleChange}
            id="outlined-search"
            label="Search field"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
           <button onClick = {this.handleSubmit}> Search</button>
        </form>
       
        </div>
      );
    }
  }

      Search.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      
      export default withStyles(styles)(Search);