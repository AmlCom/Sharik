import React, { Component } from 'react';
import Nav from '../Nav'
import axios from 'axios';
import Footer from '../Footer/Footer'
import './home.css';



class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={{ height: '100%' }}>
                    <Nav/>
                </div>
                <div className='HomepageBG'>
                    <section id="home">
                        <div id="textSlider" class="row">
                            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-4 iamCol">
                                <p></p>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-8 slideCol">
                                <div class="scroller">
                                    <div class="inner">
                                        <p>Sharik</p>
                                        <p>Helps</p>
                                        <p>Sharing </p>
                                        <p>knowledge</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default Home;
