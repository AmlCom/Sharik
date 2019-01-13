import React, { Component } from 'react';
import './Teacher.css';
import axios from 'axios';
import Search from '../search'
import { Redirect, Link } from 'react-router-dom'
import Student from '../Students/Student.js'
import Nav from '../Nav.js'

class Teachers extends Component {
    state = {
        teachers: [],
        id: '',
        isTeacher: '',
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
        then((x) => {
            if (x.data.email) {
                var isteacher = x.data.isTeacher
                this.setState({
                    isTeacher: isteacher
                })
            } 
        })
        axios.get('get/teacher')
            .then((res) => {
                this.setState({
                    teachers: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    searchTeacher = (name) => {
        this.setState({
            teachers: [name.data]
        })
    }
    teacherClicked = (id) => {
        return (
            <Redirect to='/teacher' />
        )

    }

    render() {
        if (this.state.isTeacher === '') {
            return (
                <div>
                    <br />
                    <h1>Loading.......</h1>
                </div>
            )
        }
        if (!this.state.isTeacher) {
            return (
                <div>
                    <div style={{ height: '100%' }}>
                        <Nav />
                    </div>
                    <div className='row' style={{ minHeight: document.body.clientWidth}}>
                        <div className='col-md-2'><Student/></div>
                        <div className='col-md-10'>
                            <div className='teacherSearch'>
                                < Search search={this.searchTeacher} />
                            </div>
                            {this.state.teachers.map((teacher) =>
                                <div className='container'>
                                    <div className="card">
                                        <div className='teacherPic'>
                                            <img src={teacher.image} />
                                        </div>
                                        <div className="container">
                                            <h4><b>{teacher.firstname} {teacher.lastname}</b></h4>
                                            <p>{teacher.major}</p>
                                            <Link to={{ pathname: '/teacher', state: { teacher: teacher } }} type="submit" className="btnProfile">Profile</Link>
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default Teachers;




