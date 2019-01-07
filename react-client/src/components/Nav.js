import React, { Component } from 'react';
import Shariklogo from './Shariklogo.png';
import axios from 'axios';
import './Nav.css';



class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loggedin: false,
        }
    }
    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((res) => {
                if (res.data) {
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

    logOut = () => {
        axios.get('/auth/logout').then(() => {
            window.location.assign("/");
        })
    }

    render() {
        console.log('login', this.state.Loggedin)
        if (this.state.Loggedin) {
            return (
                <div>
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a href="/">
                                        <img src={Shariklogo} width="40" height="40" className="d-inline-block align-top" alt="Sharik Logo" />
                                    </a>
                                </li>
                                <li className="nav-item active">
                                    <span className="shariklogo">Sharik</span>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link  Navbar-text" href="#" onClick={this.logOut} >Logout <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        } else {
            return (
                <div>
                    <nav className="navbar navbar-expand navbar-static-top">
                        <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a href="/">
                                        <img src={Shariklogo} width="40" height="40" className="d-inline-block align-top" alt="Sharik Logo" />
                                    </a>
                                </li>
                                <li className="nav-item active">
                                    <span className="shariklogo">Sharik</span>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link  Navbar-text" href="/signup">Signup </a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link  Navbar-text" href="/signin">Signin </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        }
    }
}


export default Navbar;
