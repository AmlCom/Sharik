import React, { Component } from 'react';
import Nav from '../Nav'
import axios from 'axios';
import homepage from '../homepage.jpg';
import Footer from '../Footer/footer'


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
                <Nav log={this.state.Loggedin}/>
            </div>
            <div className='HomepageBG'> </div>
           
            <img className="homepagepic" src={homepage} width="100%"/>
            
            <Footer/>
            
        </div>
     
        )
    }
}
export default Home;
