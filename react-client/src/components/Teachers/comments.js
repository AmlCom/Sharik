import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../Nav'
import './Teacher.css'
import Rate from '../Rating'
import { Redirect } from 'react-router-dom'


class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",
            teacherName: "",
            teacherMajor: "",
            info: "",
            price: "",
            Loggedin: false,
            student_id: '',
            comments: ''
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((x) => {
                if (x.data) {
                    console.log(this)
                    this.setState({
                        Loggedin: true,
                        image: x.data.image,
                        teacherName: x.data.firstname,
                        comments: x.data.comments
                    })
                } else {
                    this.setState({
                        Loggedin: false
                    })
                }
            })
        axios.get('/teacher').then((res) => {
            console.log("res", res);
            this.setState({
                image: res.data[0].image,
                teacherName: res.data[0].teacherName,
                teacherMajor: res.data[0].teacherMajor,
                info: res.data[0].info,
                price: res.data[0].price
            })

        }).catch((err) => {
            console.log('hi', err)
        })

    }

    // addStudent = () => {
    //     axios.post('/addStudent', {
    //         teacherEmail: this.props.location.state.teacher.email,
    //         student_id: this.state.student_id
    //     })
    //         .then((response) => {
    //             alert(response.data)
    //         })
    // }

    render() {
        if (!this.state.Loggedin) {
            return (
                <div>
                    <br/>
                    <h1>Loading.......</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{ height: '100%' }}>
                        <Nav/>
                    </div>
                    <div className='teacher'>
                        <div className='row '>
                            <div className="col-md-3 container">
                                <div className='teacherPic'>
                                    <img src={this.state.image} alt="" />
                                </div>
                                <div className="">
                                    <h4><b>{this.state.firstname} </b></h4>
                                    <p>{this.state.teacherMajor}</p>
                                    <h6>{this.state.info}</h6>
                                    <h4> <span class="badge badge-info">Class price {this.state.price}JD/Hour</span></h4>
                                    {/* <button type="button" className="btn btn-info" onClick={this.addStudent}>Request</button> */}

                                </div>
                            </div>

                            <div className="col-md-8 container">
                                <div className='card-header text-white bg-info'>
                                    <div className='d-flex flex-column bd-highlight mb-0.5'>
                                        <h3>Comments</h3>
                                    </div>
                                </div>

                                <br />

                                {this.state.comments.map((comment) => {
                                    return (
                                        <div className='userComment'>
                                            <ul className=''><span></span>
                                                <li >
                                                    <li className="card commentsCard" >
                                                        <h5 className="card-header"> {comment.madeby}</h5>
                                                        <div className="card-body">
                                                            <p className="card-text"> {comment.comment}</p>
                                                        </div>
                                                    </li>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div >
                </div >
            )
        }
    }
}
export default Comments;




