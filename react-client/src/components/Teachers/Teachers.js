import React, { Component } from 'react';
import './Teacher.css';
<<<<<<< HEAD
import Search from '../search';


const Teachers = () => {
    return (
        <div className='container'>
            <h5 className='panel-body col-md-6'>Search for a teacher</h5>
            {/* <div className="col-md-6">
                <input className="form-control" type="text" placeholder="Filter Teachers..." />
            </div> */}
            <Search />

            <form className='container'>
                <div class="form-group">
                <tr>
                  
                    <td className='border'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNimrjRZN3jIxU-D90rCnZ6pZvp9QF4t55QWP6PdOrCcyWpsvT" alt="" className="rounded card" />
                    <br/>
                    <br/>
                    <h6> Teacher Name </h6>
                    <p> Teacher Major</p>
                    <br/>
                    <button type="submit" class="btn btn-primary" href="">Profile</button>
                    <br/>
                    <br/>
                    </td>

                   <div className='spacing'>
                    <td className='border'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNimrjRZN3jIxU-D90rCnZ6pZvp9QF4t55QWP6PdOrCcyWpsvT" alt="" className="rounded card" />
                    <br/>
                    <h6> Teacher Name</h6>
                    <br/>
                    <p> Teacher Major</p>
                    <br/>
                    <button type="submit" class="btn btn-primary" href="">Profile</button>
                    <br/>
                    <br/>
                    </td>

                    </div>  
                </tr>
                    

                    
                    
=======
import axios from 'axios';
import Search from '../search'


class Teachers extends Component {
    state = {
        teachers: []
    }
>>>>>>> 178f4731be71aa2c899a82e9a55ad5bcc2063965

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