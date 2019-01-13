import React, { Component } from 'react';
import { storage } from '../firebase/index'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Profile.css'
import Nav from './Nav'
import Comments2 from './Teachers/comments2';
var user = ''


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            teacherName: "",
            teacherMajor: "",
            info: "",
            price: "",
            studentList: [],
            requestsNumber: 0,
            comments: 0,
            lectures: 0,
            schedule: 0
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((response) => {
                if (response.data.email) {
                    user = response.data.firstname
                    this.setState({
                        teacherName: response.data.firstname + " " + response.data.lastname,
                        comments: response.data.comments.length,
                        lectures: response.data.video.length,
                        schedule: response.data.acceptedRequests.length

                    })
                    //get authorized teacher from the database

                    axios.post('/get/specTeacher', { name: user })
                        .then((res) => {
                            this.setState({
                                image: res.data.image
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                    this.setState({
                        Loggedin: true,
                        isTeacher: response.data.isTeacher
                    })
                }
            })

        axios.get('/teacher').then((res) => {
            this.setState({
                image: res.data[0].image,
                teacherName: res.data[0].teacherName,
                teacherMajor: res.data[0].teacherMajor,
                info: res.data[0].info,
                price: res.data[0].price
            })

        }).catch((err) => {
            console.log('err', err)
        })
        axios.get('/studentList').then((res) => {
            this.setState({
                requestsNumber: res.data.length,
                studentList: res.data
            })
        })
    }





    uploadImage = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    submitImage = () => {
        var image = this.state.image
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed', (snapshot) => {

        }, (error) => {
            console.log(error)
        }, () => {
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log('url', url)
                var obj = { name: user, image: url }
                axios.post('get/updateTeacherProfile', obj)
                    .then((res) => {
                        this.setState({
                            image: res.data.image
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
        });
    }



    render() {
        return (
            <div>
                <div style={{ height: '100%' }}>
                    <Nav />
                </div>

                <div className="container">
                    <div className='row' style={{ marginTop: '5%' }}>
                        <div className="pic col-md-4"  >
                            <img src={this.state.image} alt="" className="rounded" />
                            <br />
                            <br />
                            <div className="input-group mb-3">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.uploadImage} />
                                    <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <button className="input-group-text" id="inputGroupFileAddon02" onClick={this.submitImage}>Upload</button>
                                </div>
                            </div>
                        </div>


                        <div className='col-md-8'>
                            <div class="container-fluid page-cont">
                                <div class="row dash-row">
                                    <div class="col-4 data-box">
                                        <div>
                                            <a href="./lectures"><h5><span>{this.state.lectures}</span> Lectures</h5></a>
                                        </div>
                                    </div>
                                    <div class="col-4 data-box ">
                                        <Link to={{ pathname: '/Requests', state: { students: this.state.studentList } }}>
                                            <h5><span>{this.state.requestsNumber}</span> Requests</h5>
                                        </Link>
                                    </div>
                                    <div class="col-4 data-box">

                                        <Link to={{ pathname: '/schedule', state: { students: this.state.studentList } }}>
                                            <h5><span>{this.state.schedule}</span> Schedule</h5>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <br/> 
                            <Comments2 />

                        </div>
                    </div>
                    {/* <div className='row teacherName container '>
                         <h4> {this.state.teacherName}</h4>
                        <div classNam='col-md-4'>
                            <div className="list-group">
                                <a className="list-group-item">
                                    <span className="glyphicon glyphicon-cog" aria-hidden="true"></span> <h4> {this.state.teacherName}</h4>
                                    <div><h5 className="font-weight-light font-weight-bold "> {this.state.teacherMajor}</h5></div>
                                    <div><h6 className="font-weight-light font-weight-bold ">{this.state.info}</h6></div>
                                </a>
                            </div>
                        </div>
                    </div> */}



                </div>
            </div>
        )
    }
}
export default Profile;



