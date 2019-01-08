import React, { Component } from 'react';
import './Teacher.css';
import axios from 'axios';
import Search from '../search'
import { Redirect, Link } from 'react-router-dom'
import Nav from '../Nav'
import Teacher from './Teacher'


class Teachers extends Component {
    state = {
        teachers: [],
        id: ''
    }
    componentDidMount() {
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
        console.log('i was research', name)
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

        console.log('teachers', this.state.teachers)
        if (this.state.teachers.length === 1) {
            return (
                <div>
                    <div style={{ height: '100%' }}>
                        <Nav log={this.state.Loggedin} />
                    </div>
                    <form className='container'>
                        < Search className='teacherSearch' search={this.searchTeacher} />
                        <div className="card">
                            <img className='teacherPic' src={this.state.teachers[0].image} />
                            <div className="container">
                                <h4><b>{this.state.teachers[0].firstname} {this.state.teachers[0].lastname}</b></h4>
                                <p> {this.state.teachers[0].major}</p>
                                {/* <Link to={{ pathname: '/teacher', state: { teacher: teacher } }} type="submit" className="btn btn-primary">Profile</Link> */}
                                <br />
                            </div>
                        </div>
                    </form>
                </div>

            )
        } else {
            return (
                <div>
                    <div style={{ height: '100%' }}>
                        <Nav log={this.state.Loggedin} />
                    </div>
                    <div className='teacherSearch'>
                        < Search search={this.searchTeacher} />
                    </div>
                    {this.state.teachers.map((teacher) =>
                        <div className='container'>
<<<<<<< HEAD
                            <div className="card float-left">
                                <img src={teacher.image}/>
=======
                            <div className="card">
                            <div className='teacherPic'>
                            <img  src={teacher.image} />
                            </div>
>>>>>>> dee4ef0def024d345bed54062ce04457ea6f0d96
                                <div className="container">
                                    <h4><b>{teacher.firstname} {teacher.lastname}</b></h4>
                                    <p>{teacher.major}</p>
                                    <Link to={{ pathname: '/teacher', state: { teacher: teacher } }} type="submit" className="btnProfile">Profile</Link>
                                    <br />
                                    <br/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    }
}


export default Teachers;
<<<<<<< HEAD
=======




>>>>>>> dee4ef0def024d345bed54062ce04457ea6f0d96
