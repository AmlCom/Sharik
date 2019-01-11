import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Shariklogo from './Shariklogo.png';
import axios from 'axios';
import './Nav.css';
import {Link} from 'react-router-dom';



class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loggedin: true,
            isTeacher : false,
            TeacherName: ''
        }
    }
    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((res) => {
                console.log('hsagjdagshdas',res.data)
                if (res.data) {
                    this.setState({
                        Loggedin: true,
                        isTeacher: res.data.isTeacher,
                        TeacherName: res.data.firstname
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

    redirect =(haha) => {
        console.log('hahhahahaha',haha)
        if(haha){
            let path = '/Profile';
            this.props.history.push(path);
        }else {
            let path = '/Profile1';
            this.props.history.push(path);
        }
    }

    render() {
        console.log('login', this.state.Loggedin)
        if (this.state.Loggedin) {
            return (
                <div>
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
                            <Link to="/">
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <img src={Shariklogo} width="40" height="40" className="d-inline-block align-top" alt="Sharik Logo" />
                                    </li>
                                    <li className="nav-item active">
                                        <span className="shariklogo Navbar-text">Sharik</span>
                                    </li>
                                </ul>
                            </Link>
                        </div>
                        <div className='navbarButtons'>
                            <ul className="navbar-nav">
                                <button><li className="nav-link  Navbar-text">Welcome {this.state.TeacherName}</li></button>
                                <li className="nav-item active">
                                    <button className="nav-link  Navbar-text" onClick={()=>{this.redirect(this.state.isTeacher)}}> Profile <span className="sr-only">(current)</span></button>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link  Navbar-text" href="#" onClick={this.logOut} >Logout <span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            )
        } else {
            return (
                <div>
                    <nav className="navbar navbar-expand navbar-static-top">
                        <div className="collapse navbar-collapse mr-auto" id="navbarSupportedContent">
                            <Link to="/">
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <a href="/">
                                            <img src={Shariklogo} width="40" height="40" className="d-inline-block align-top" alt="Sharik Logo" />
                                        </a>
                                    </li>
                                    <li className="nav-item active">
                                        <span className="shariklogo Navbar-text">Sharik</span>
                                    </li>
                                </ul>
                            </Link>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link to ='/signup' className="nav-link  Navbar-text">Signup</Link>                           
                            </li>
                            <li className="nav-item active">
                                <Link to='/signin' className="nav-link  Navbar-text">Signin</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        }
    }
}


export default withRouter(Navbar);
