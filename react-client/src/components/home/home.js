import React, { Component } from 'react';
import Nav from '../Nav'
import axios from 'axios';
import Footer from '../Footer/footer'
import './home.css';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loggedin: false,
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((x) => {
                console.log('356', x);
                if (x.data) {
                    console.log(this)
                    this.setState({
                        Loggedin: true
                    })
                } else {
                    this.setState({
                        Loggedin: false
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <div style={{ height: '100%' }}>
                    <Nav log={this.state.Loggedin} />
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
