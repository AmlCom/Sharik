
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';

 
class Rate extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      rating:(props.teacher.rating)? props.teacher.rating :1,
      name:'',
      rate:'',
      count: 0
    };
  }

  componentDidMount(){
    this.setState({
      rating:this.props.teacher.rating
    })
    
    axios.get('/auth/checkLogging').
    then((x) => {
        console.log('jjjjj', x.data);
        
    })
    .catch((err) => {
      console.log(err)
    })
    
}

 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    console.log('rating',this.state.rating)
    console.log('nextValue',nextValue)
  }
  submit = (name) =>{
    console.log('Rating',this.state.rating)
    console.log('mustaf',this.props.teacher.rating )
    console.log('teacher firsname',this.props.teacher.firstname)
    var count = this.props.teacher.rateCount 

  //  var rating = Math.floor((this.props.teacher.rating*5+this.state.rating)/count)
  // var rating = Math.floor((this.props.teacher.rating+ this.state.rating)/count)
  var rating = Math.floor((Math.random() * 5)); 
  //  console.log('math.floor', rating)




    //axi
    var obj = { name: this.props.teacher.firstname,rating:rating,count:count }
     console.log('MUSTAF Rating axios post', obj)
    axios.post('get/ratingTeacher', obj)
    .then((res) => {
      console.log('object',res.data)
    })
    .catch((error) => {
      console.log(error)
    })

  }
 
  render() {
    console.log('ayeeyo',this.props.teacher)
    const { rating } = this.state;
    const rate = this.props.teacher.rating
    console.log('yuuaauau',rate)
    console.log('Rating',this.props.teacher.rating)
    console.log('MUSTAF teacher rating',this.props.teacher)
    var star = ()=>{
      return (
        <StarRatingComponent 
        name="rate1" 
        starCount={5}
        value={this.state.rating}
        onStarClick={this.onStarClick.bind(this)}
      />
      )
    }
    return (                
      <div>
        {/* <Teacher/> */}
        <h5>Rating : {star ()}</h5>
        {/* <h5>Rating from state: {rating}</h5>

        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        /> */}
      
      <button type="button" className="btn btn-info" onClick = {this.submit}>Rate</button>
      </div>
    );
  }
}

 export default Rate;