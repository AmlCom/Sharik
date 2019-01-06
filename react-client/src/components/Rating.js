
import React, { Component } from 'react';
// import axios from 'axios';
import { Redirect } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';

 
class Rate extends React.Component {
  constructor() {
    super();
 
    this.state = {
      rating: 1
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    //console.log('rating',this.state.rating)
  }
  submit = () =>{
    console.log('mustaf',this.state.rating)
    //axi

  }
 
  render() {
    const { rating } = this.state;
    console.log('teacher rating',this.props.teacher)
    return (                
      <div>
        {/* <Teacher/> */}
        <h5>Rating from state: {rating}</h5>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      
      <button onClick = {this.submit}>rate</button>
      </div>
    );
  }
}

 export default Rate;