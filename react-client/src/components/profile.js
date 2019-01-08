import React, { Component } from 'react';
import { storage } from '../firebase/index'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
<<<<<<< HEAD
import { Redirect } from 'react-router-dom';
// import './Profile.css'
=======
import './Profile.css'
>>>>>>> 69b05bf30621d7ffc0367b6b41b8d148e2625054
import Nav from './Nav'


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
            requestsNumber: 0
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((response) => {
                console.log('hello world')
                if (response.data.email) {
                    user = response.data.firstname
                    //get authorized teacher from the database

                    axios.post('/get/specTeacher', { name: user })
                        .then((res) => {
                            console.log('resppp', res.data)
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
                //   } else {
                //     this.setState({
                //       Loggedin: false
                //     })
                //   }
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
        axios.get('/studentList').then((res) => {
            console.log("213", res);
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
                        <div className='row'>
                            <div className='col-md-2'>
                              <Link to={{ pathname: '/Requests', state: { students: this.state.studentList} }} className="mainLinks list-group-item justify-content-between">
                              <h5 className='dashbored'>Requests</h5><span class="badge badge-primary number">{this.state.requestsNumber}</span>
                              </Link>
                            </div>
                            <div className='col-md-2'>
                                <a href="./comments" className="mainLinks list-group-item justify-content-between">
                                    <h5 className='dashbored'>Comments</h5><span className="badge badge-primary number">2</span>
                                </a>
                            </div>
                            <div className='col-md-2'>
                                <a href="./lectures" className="mainLinks list-group-item justify-content-between">
                                   <h5 className='dashbored'>Lectures</h5><span className="badge badge-primary number">1</span>
                                </a>
                            </div>
                            <div className='col-md-2'>
                                <a href="./lectures" className="mainLinks list-group-item justify-content-between">
                                   <h5 className='dashbored'>Schedule</h5><span className="badge badge-primary number">1</span>
                                </a>
                            </div>

                        </div>
                        <hr />


                        <div className='row'>
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


                            <div classNam='col-md-8'>
                                <div className="list-group">
                                    <a className="list-group-item">
                                        <span className="glyphicon glyphicon-cog" aria-hidden="true"></span> <h4> {this.state.teacherName}</h4>
                                        <div><h5 className="font-weight-light font-weight-bold "> {this.state.teacherMajor} teacher </h5></div>
                                        <div><h6 className="font-weight-light font-weight-bold ">{this.state.info}</h6></div>
                                        <h4> <span class="badge badge-info">Class price {this.state.price}JD/Hour</span></h4>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
    }
}
export default Profile;
