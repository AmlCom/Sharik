
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';

 
class Rate extends React.Component {
  constructor() {
    super();
 
    this.state = {
      rating: 1,
      name:'',
      rate:''
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    //console.log('rating',this.state.rating)
  }
  submit = (name) =>{
    console.log('mustaf',this.state.rating)
    console.log('yyyyyyy',this.props.teacher.firstname)
    var count = this.props.teacher.rateCount+1

   var rating = Math.floor((this.props.teacher.rating*5+this.state.rating)/(count))


    //axi
    var obj = { name: this.props.teacher.firstname,rating:rating,count:count }
     console.log('MUSTAF Rating axios post', obj)
    axios.post('get/ratingTeacher', obj)
    .then((res) => {
      console.log('mustaffffahme',res.data)
    })
    .catch((error) => {
      console.log(error)
    })

  }
 
  render() {
    const { rating } = this.state;
    const rate = this.props.teacher.rating
    console.log('hhhh',this.props.teacher.rating)
    console.log('MUSTAF teacher rating',this.props.teacher)
    return (                
      <div>
        {/* <Teacher/> */}
        <h5>Rating from state: {rate}</h5>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      
      <button onClick = {this.submit}>Rate</button>
      </div>
    );
  }
}

 export default Rate;