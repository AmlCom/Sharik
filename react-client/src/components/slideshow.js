import React from 'react';
import { Fade } from 'react-slideshow-image';
import $ from 'jquery';

const fadeImages = [
  'http://institute-of-progressive-education-and-learning.org/wp-content/uploads/2014/03/Teacher-2.jpg',
  'https://www.canva.com/learn/wp-content/uploads/2018/07/Canva-Students-in-Lecture-Room-.jpg',
  'https://cdngeneral.rentcafe.com/dmslivecafe/3/651450/slider_1-model.jpg?quality=85&scale=both&'
  

];

const fadeProperties = {
  duration: 1000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  height: 20
}

const Slideshow= () =>  {

    return (
      <Fade {...fadeProperties}>
        <div className="each-fade">
          <div className="image-container">
          <a href="http://localhost:3000/about">
            <img src={fadeImages[0]} />
            </a>
          </div>
        </div>

        <div className="each-fade">
          <div className="image-container">
          <a href="http://localhost:3000/signin">
            <img src={fadeImages[1]} />
            </a>
          </div>
        </div>

        <div className="each-fade">
          <div className="image-container">
          <a href="http://localhost:3000/signin">
            <img src={fadeImages[2]} />
            </a>
          </div>
        </div>





      </Fade>
    )
  }

export default Slideshow