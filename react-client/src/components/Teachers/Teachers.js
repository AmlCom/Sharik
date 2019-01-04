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
            teachers: [name.data]
        })
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
                                <h6> {this.state.teachers[0].firstname} </h6>
                                <p> {this.state.teachers[0].lastname}</p>
                                <button type="submit" class="btn btn-primary" href="">Profile</button>
                            </td>
                        </tr>
                    </div>
                </form>
            )
        } else {
            return (
                <div className=''>
                    < Search search={this.searchTeacher} />
                    {this.state.teachers.map((teacher) =>
                    <div className='container'>
                        <form className='border'>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                        <img src={teacher.image} alt="" className="card border" />
                                        </div>

                                        <div className ='col-md-6'>
                                             <div className='container-fluid'>
                                             <br/>
                                                 <h2>{teacher.firstname} {teacher.lastname}</h2>
                                                <h3>{teacher.major}</h3>
                                              </div>
                                            <div>
                                            <button type="submit" class="btn btn-primary btn-lg" href="">Profile</button>
                                            </div>
                                        </div>
                                    </div>
                        </form>
                        </div>
                    )}
                </div>
            )
        }
    }
}


export default Teachers;



