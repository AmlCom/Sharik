import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Nav from '../Nav'
import {Link} from 'react-router-dom';


class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherName: '',
            schedule: ''
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((response) => {
                this.setState({
                    teacherName: response.data.firstname,
                    schedule: response.data.acceptedRequests
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    accept = (firstname, id, email) => {
        let studentId = id;
        axios.post('/get/accept', { studentId: studentId })
            .then((res) => {
                $(`#${studentId}`).hide();
            })
            var obj = {
                student: firstname,
                email:email,
                id:id
            }
            this.state.schedule.push(obj)
            var obj = {
                teacher:this.state.teacherName,
                student: this.state.schedule
            }
            axios.post('/get/schedule',obj)
            .then((res) => {
            })
            .catch((err) => {
                console.log(err)
            })
    }

    reject = (id) => {
        let studentId = id;
        axios.post('/get/reject', { studentId: studentId })
            .then((res) => {
                $(`#${studentId}`).hide();
            })
    }

    render() {
        return (
            <div>
                <Nav />
                <div className='container'>
                    <div className="panel requestTable">
                        <div className="panel-heading ">
                            <h3 className="panel-title">Your requests:</h3>
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
                                        <td>
                                            <button className="btn btnAccept"><a onClick={() => { this.accept(student.firstname, student._id, student.email) }}>Accept</a></button>
                                            <button className="btn btnReject"><a onClick={() => { this.reject(student._id) }}>Reject</a></button>
                                        </td>
                                    </tr>
                                )}
                            </table>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}

export default Request;

