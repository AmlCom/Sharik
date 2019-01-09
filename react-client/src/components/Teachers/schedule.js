import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Nav from '../Nav'


class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: null
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((response) => {
                console.log('hello world', response.data.acceptedRequests)
                this.setState({
                    schedule: response.data.acceptedRequests
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // handleClick = (e) => {
    //     this.setState(() => {
    //         schedule:e.target.value
    //     })
    // }

    render() {
        console.log('schedule', this.state.schedule)
        if (this.state.schedule!== null) {
            return (
                <div>
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
                                {this.state.schedule.map((student) =>{
                               return (
                                    <tr >
                                        <td>{student.student}</td>
                                        <td>{student.email}</td>
                                        <td><a className="btn btn-success" onClick = {()=>{this.accept(student.firstname,student._id,student.email)}}  >Accept</a> <a onClick = {()=>{this.reject(student._id)}} className="btn btn-danger" >Reject</a></td>
                                    </tr>
                                )})}
    
                            </table>
                        </div>
                    </div>
                    <br />
                  
                </div>
                </div>
            )
        } else {
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

                            </tr>
                            </table>
                    </div>
                </div>           }
            </div>
            )}
                }
            }
                
                export default Schedule;
                
