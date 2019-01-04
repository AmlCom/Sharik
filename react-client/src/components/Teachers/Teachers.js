import React, { Component } from 'react';
import './Teacher.css';
import axios from 'axios';
import Search from '../search'


class Teachers extends Component {
    state = {
        teachers: []
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
            teachers:[name.data]
        })
    }

    render() {
        console.log('teachers', this.state.teachers)
        if (this.state.teachers.length === 1) {
            return (
                <form className='container'>
                < Search search={this.searchTeacher} />
                    <div class="form-group">
                        <tr>

                            <td className='border'>
                                <img src={this.state.teachers[0].image} alt="" className="rounded card" />
                                <br />
                                <br />
                                <h6> {this.state.teachers[0].firstname} </h6>
                                <p> {this.state.teachers[0].lastname}</p>
                                <br />
                                <button type="submit" class="btn btn-primary" href="">Profile</button>
                                <br />
                                <br />
                            </td>
                        </tr>

                    </div>

                </form>
            )
        } else {
            return (
                <div className='container'>
                    < Search search={this.searchTeacher} />

                    {this.state.teachers.map((teacher) =>

                        <form className='container'>
                            <div class="form-group">
                                <tr>

                                    <td className='border'>
                                        <img src={teacher.image} alt="" className="rounded card" />
                                        <br />
                                        <br />
                                        <h6> {teacher.firstname} </h6>
                                        <p> {teacher.lastname}</p>
                                        <br />
                                        <button type="submit" class="btn btn-primary" href="">Profile</button>
                                        <br />
                                        <br />
                                    </td>
                                </tr>

                            </div>

                        </form>
                    )}


                </div>
            )
        }
    }
}


export default Teachers;