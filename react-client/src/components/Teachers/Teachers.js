import React, { Component } from 'react';
import './Teacher.css';
import axios from 'axios';
import Search from '../search'
import {Redirect, Link} from  'react-router-dom'
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
                <form className='container flux'>
                    < Search search={this.searchTeacher} />
                    <div class="form-group">
                        <tr>
                            <td className='border'>
                                <img src={this.state.teachers[0].image} alt="" className="rounded card" />
                                <h6> {this.state.teachers[0].firstname} {this.state.teachers[0].lastname}</h6>
                                <p> {this.state.teachers[0].major} </p>
                                <button type="submit" class="btn btn-primary" href="/teacher">Profile</button>
                                <br />
                                <br />
                            </td>
                        </tr>
                    </div>
                </form>

            )
        } else {
            return (
                <div>
                    < Search search={this.searchTeacher} />
                    {this.state.teachers.map((teacher) =>
                        <div className='container'>
                            <div className="card float-left teacherCard">
                                <img src={teacher.image}/>
                                <div className="container">
                                    <h4><b>{teacher.firstname} {teacher.lastname}</b></h4>
                                    <p>{teacher.major}</p>
                                    <Link  to={{ pathname: '/teacher', state: { teacher: teacher} }} type="submit" class="btn btn-primary">Profile</Link>
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


{/* 
<div className='container'>
                            <div class="form-group float-left teacherCard">
                                <tr>
                                    <td className='border'>
                                        <img src={teacher.image} alt="" className="rounded card" />
                                        <br />
                                        <br />
                                        <h6> {teacher.firstname} </h6>
                                        <p> {teacher.lastname}</p>
                                        <br />
                                        <Link  to={{ pathname: '/teacher', state: { teacher: teacher} }} type="submit" class="btn btn-primary">Profile</Link>
            
//                                         {/* <a type="submit" class="btn btn-primary" href='/teacher'>Profile</a> */}
//                                         <br />
//                                         <br />
//                                     </td>
//                                 </tr>
//                             </div>
//                         </div>
//  */}

