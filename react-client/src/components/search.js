import React from 'react';
import axios from 'axios';



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

    var obj = { name: this.state.name }

    axios.post('get/specTeacher', obj)
      .then((res) => {
        this.props.search(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (

      <form className="form-inline">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleChange} />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Search</button>
      </form>

    );
  }
}

export default Search;




