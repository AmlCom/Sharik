import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';


class Request extends Component  {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    accept = (e) => {
       console.log(e.target.parentElement.parentElement.id);
       let studentId = e.target.parentElement.parentElement.id;
       axios.post('/accept', {studentId: studentId})
       .then((res) => {
         console.log('hi again');
         $(`#${studentId}`).hide();
       })
    }

    reject = (e) => {
        let studentId = e.target.parentElement.parentElement.id;
        axios.post('/reject', {studentId: studentId})
        .then((res) => {
            console.log('gotcha', res)
            $(`#${studentId}`).hide();
        })
    }

    render() {
        return (
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
                </div>
                <br />
                <table className="table table-striped  ">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    {this.props.location.state.students.map((student) =>
                        <tr>    
                            <td>{student.firstname}</td>
                            <td>{student.email}</td>
                            <td><a className="btn btn-success" href="">Accept</a> <a className="btn btn-danger" href="#">Reject</a></td>
                        </tr>
                    )}
                   
                </table>
            </div>
        )
                    
    }
}

export default Request;

