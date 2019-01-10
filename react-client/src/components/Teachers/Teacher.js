import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../Nav'
import './Teacher.css'
import Rate from '../Rating'
import $ from 'jquery'
class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "",
            teacherName: "",
            teacherMajor: "",
            info: "",
            price: "",
            student_id: '',
            previousComments:null,
            comment: '',
            studentName: ''
        }
    }

    componentDidMount() {
      
        axios.get('/auth/checkLogging').
            then((x) => {
                console.log('321', x.data);
                if (x.data) {
                    console.log(this)
                    this.setState({
                        student_id: x.data._id,
                        studentName: x.data.firstname
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


        axios.post('/get/specTeacher', { name: this.props.location.state.teacher.firstname })
            .then((res) => {
                this.setState({
                    previousComments: res.data.comments
                })
            })
            .catch((err) => {
                console.log(err)
            })

    }


    addStudent = () => {
        axios.post('/student/addStudent', {
            teacherEmail: this.props.location.state.teacher.email,
            student_id: this.state.student_id
        })
            .then((response) => {
                alert(response.data)
            })
    }

    comment = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    submitComment = () => {
        console.log('kkkkkk', this.props.location.state.teacher.comments)
        $('#comment').val(''); 
        if (this.state.comment === '') {
            console.log('please write comment')
        } else {

            var obj = {
                madeby: this.state.studentName,
                comment: this.state.comment,
                teacherName: this.props.location.state.teacher.firstname
            }

            let made = false;
            for (var i = 0; i < this.state.previousComments.length; i++) {
                if (this.state.previousComments[i].madeby === this.state.studentName) {
                    made = true
                }
            }
            if (!made) {

                let comments = this.state.previousComments
                console.log('comments', comments)

                comments.push(obj)
                axios.post('/get/comment', { comment: comments })
                    .then((res) => {
                        console.log('from ', res)
                        this.setState({
                            comment: res.data.comments
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            } else {
                alert('you already made your comment')
            }





            // axios.post('/get/specTeacher', { name: this.props.location.state.teacher.firstname })
            //     .then((res) => {
            //         console.log('balabalabala', res)
            //         var made = false
            //         for (var i = 0; i < res.data.comments.length; i++) {
            //             if (res.data.comments[i].madeby === this.state.studentName) {
            //                 made = true
            //             }
            //         }
            //         if (!made) {

            //             let comments = res.data.comments

            //             comments.push(obj)
            //             axios.post('/get/comment', { comment: comments })
            //                 .then((res) => {
            //                     console.log('from ', res)
            //                     this.setState({
            //                         comment: res.data.comments
            //                     })
            //                 })
            //                 .catch((err) => {
            //                     console.log(err)
            //                 })

            //         } else {
            //             alert('you already made your comment')
            //         }


            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })


            //  this.props.location.state.teacher.comments.push(obj)
            //  console.log('afterpush',this.props.location.state.teacher.comments)
            // axios.post('/get/comment',{comment:this.props.location.state.teacher.comments})
            // .then((res) => {
            //     console.log('from ',res)
            // })
            // .catch((err) => {
            //     console.log(err)
            // })


        }
    }

    render() {
        console.log('prvcc', this.state.previousComments)
        const { teacher } = this.props.location.state
        if (this.state.previousComments !== null) {
            return (
                <div>
                    <div style={{ height: '100%' }}>
                        <Nav />
                    </div>
                    <div className='teacher'>
                        <div className='row '>
                            <div className="col-md-3 container">
                                <div className='teacherPic'>
                                    <img src={teacher.image} alt="" />
                                </div>
                                <div className="">
                                    <h4><b>{teacher.firstname} {teacher.lastname}</b></h4>
                                    <p>{this.state.teacherMajor}</p>
                                    <h6>{this.state.info}</h6>
                                    <h4> <span class="badge badge-info">Class price {this.state.price}JD/Hour</span></h4>
                                    <button type="button" className="btn btn-info" onClick={this.addStudent}>Request</button>
                                    <Rate teacher={teacher} />
                                </div>
                            </div>

                            <div className="col-md-8 container">
                                <div className='card-header text-white bg-info'>
                                    <div className='d-flex flex-column bd-highlight mb-0.5'>
                                        <h3>Comments</h3>
                                    </div>
                                </div>

                                <br />
                                <div className="input-group mb-3">
                                    <input type="text"  id="comment" class="form-control" placeholder="Write a comment" onChange={this.comment} />
                                    <div className="input-group-append">
                                        <button className="btn btn-info" type="button" onClick={this.submitComment}>Comment</button>
                                    </div>
                                </div>

                                {this.state.previousComments.map((comment) => {
                                    return (
                                        <div className=''>
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
                                    <img src={teacher.image} alt="" />
                                </div>
                                <div className="">
                                    <h4><b>{teacher.firstname} {teacher.lastname}</b></h4>
                                    <p>{this.state.teacherMajor}</p>
                                    <h6>{this.state.info}</h6>
                                    <h4> <span class="badge badge-info">Class price {this.state.price}JD/Hour</span></h4>
                                    <button type="button" className="btn btn-info" onClick={this.addStudent}>Request</button>
                                    <Rate teacher={teacher} />
                                </div>
                            </div>

                            <div className="col-md-8 container">
                                <div className='card-header text-white bg-info'>
                                    <div className='d-flex flex-column bd-highlight mb-0.5'>
                                        <h3>Comments</h3>
                                    </div>
                                </div>

                                <br />
                                <div className="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Write a comment" onChange={this.comment} />
                                    <div className="input-group-append">
                                        <button className="btn btn-info" type="button" onClick={this.submitComment}>Comment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            )

        }
    }
}
export default Teacher;
