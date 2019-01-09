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
                                <th>Profile picture</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                            {this.props.location.state.students.map((student) =>
                                <tr id={student._id}>
                                    <th><img className='studentpic' src ='https://4vector.com/i/free-vector-small-whale-clip-art_110039_Small_Whale_clip_art_hight.png'/></th>
                                    <td>{student.firstname}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <button className="btn btnAccept"><a onClick = {()=>{this.accept(student.firstname,student._id,student.email)}}>Accept</a></button>
                                        <button className="btn btnReject"><a onClick = {()=>{this.reject(student._id)}}>Reject</a></button> 
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

