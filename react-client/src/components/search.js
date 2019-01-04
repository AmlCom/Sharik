import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


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
    constructor(props) {
      super(props)
    this.state = {
      name: ''
      
    };
  }
  
    handleChange = (event) => {
      this.setState({
        name: event.target.value
      });
    };
    handleSubmit = (name) => {
      
     // this.props.search(this.state.name)
     var obj = {name:this.state.name}
      
      axios.post('get/specTeacher',obj)
      .then((res) => {
       this.props.search(res)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  
    render() {
    
      console.log('kkkk', this.props.search)
      const { classes } = this.props;

      return (
        <div>
        <form className={classes.container} noValidate autoComplete="off" >
  

          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange = {this.handleChange}
          />
          
        </form>
        <button onClick={this.handleSubmit} >Search</button>
        </div>
      );
    }
  }

      Search.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      
      export default withStyles(styles)(Search);