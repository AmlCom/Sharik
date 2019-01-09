import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Nav from '../Nav'


class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherName:'',
            schedule:''

        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((response) => {
                console.log('hello world', response)
                this.setState({
                    teacherName:response.data.firstname,
                    schedule:response.data.acceptedRequests
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    accept = (firstname,id,email) => {
        console.log('eeeeee',firstname)
        console.log('id',id)
        // console.log('hhhh',e.target.parentElement.parentElement)
        // console.log(e.target.parentElement.parentElement.id);
        let studentId = id;
        axios.post('/accept', { studentId: studentId })
            .then((res) => {
                console.log('hi again');
                $(`#${studentId}`).hide();
            })
            var obj = {
                student: firstname,
                email:email
            }
            this.state.schedule.push(obj)
            var obj = {
                teacher:this.state.teacherName,
                student: this.state.schedule
            }
            axios.post('/get/schedule',obj)
            .then((res) => {
                console.log('pooo',res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    reject = (id) => {
        console.log('id',id)
        let studentId = id;
        axios.post('/reject', { studentId: studentId })
            .then((res) => {
                console.log('gotcha', res)
                $(`#${studentId}`).hide();
            })
    }

    render() {
        console.log('schedule',this.state.schedule)
        return (
            <div>
<<<<<<< HEAD
            <Nav />
            <div className='container'>
                <div className="panel">
                    <div className="panel-heading ">
                        <h3 className="panel-title">Your requests</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                        </div>
                        <br />
                        <table className="table table-striped">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                            {this.props.location.state.students.map((student) =>
                                <tr id={student._id}>
                                    <td>{student.firstname}</td>
                                    <td>{student.email}</td>
                                    <td><a className="btn btn-success" onClick = {()=>{this.accept(student.firstname,student._id,student.email)}}  >Accept</a> <a onClick = {()=>{this.reject(student._id)}} className="btn btn-danger" >Reject</a></td>
                                </tr>
                            )}

                        </table>
=======
                <div style={{ height: '100%' }}>
                    <Nav/>
                </div>
                <div className='container'>
                    <div className="panel">
                        <div className="panel-heading ">
                            <h3 className="panel-title">Your requests</h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                            </div>
                            <br />
                            <table className="table table-striped">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                                {this.props.location.state.students.map((student) =>
                                    <tr id={student._id}>
                                        <td>{student.firstname}</td>
                                        <td>{student.email}</td>
                                        <td><a className="btn btn-success" onClick={this.accept}>Accept</a> <a onClick={this.reject} className="btn btn-danger" >Reject</a></td>
                                    </tr>
                                )}
                            
                            </table>
                        </div>
>>>>>>> 6e8a5299a9c4cadbb995de50d3bc0fbd6c1c6a54
                    </div>
                </div>
                <br />
            </div>
            </div>
        )

    }
}

export default Request;

