import React, { Component } from 'react';
import { storage } from '../../firebase/index'
import axios from 'axios';
import Nav from '../Nav';
import './Teacher.css';



var user = ''

class Videos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loggedin: false,
            email: '',
            password: '',
            video: '',
            lectures: [],
            Loggedin: false
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((response) => {
                console.log('yahyaaaaa', response.data.firstname)
                if (response.data) {
                    user = response.data.firstname
                    axios.post('/get/specTeacher', { name: user })
                        .then((res) => {
                            this.setState({
                                lectures: res.data.video
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                    this.setState({
                        Loggedin: true,
                        isTeacher: response.data.isTeacher,
                    })

                } else {
                    this.setState({
                        Loggedin: false
                    })
                }
            })

    }

    uploadVideo = (e) => {
        this.setState({
            video: e.target.files[0]
        })
    }
    submitVideo = () => {
        var video = this.state.video
        const uploadTask = storage.ref(`videos/${video.name}`).put(video)
        uploadTask.on('state_changed', (snapshot) => {

        }, (error) => {
            console.log(error)
        }, () => {
            storage.ref('videos').child(video.name).getDownloadURL().then(url => {
                this.setState({
                    lectures: [...this.state.lectures, url]
                })
                var obj = { name: user, videos: this.state.lectures }
                axios.post('get/addVideoLecture', obj)
                    .then((res) => {
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
        });
    }

    render() {
        if (this.state.lectures.length === 1) {
            return (
                <div>
                    <div style={{ height: '100%' }}>
                        <Nav log={this.state.Loggedin} />
                    </div>
                    <div className='container'>
                        <div className="input-group mb-3 uploadVideo">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.uploadVideo} />
                                <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                            </div>
                            <div className="input-group-append">
                                <button className="input-group-text" id="inputGroupFileAddon02" onClick={this.submitVideo}>Upload</button>
                            </div>
                        </div>
                        <div className='videoWrapper'>
                            <video controls="true">
                                <source src={this.state.lectures[0]} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>

            )
        } else if (this.state.lectures.length > 1) {
            return (
                <div>
                    <div style={{ height: '100%' }}>
                        <Nav log={this.state.Loggedin} />
                    </div>
                    <div className='container'>
                        <div className="input-group mb-3 uploadVideo">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.uploadVideo} />
                                <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                            </div>
                            <div className="input-group-append">
                                <button className="input-group-text" id="inputGroupFileAddon02" onClick={this.submitVideo}>Upload</button>
                            </div>
                        </div>
                        {this.state.lectures.map((video) =>
                            <div className='videoWrapper'>
                                <video className='teacherVideo border' controls="true">
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>
                        )}
                    </div>
                </div>

            )
        } else {
            return (
                <div>
                    <div style={{ height: '100%' }}>
                        <Nav log={this.state.Loggedin} />
                    </div>

                    <div className='container'>
                        <div className="input-group mb-3 uploadVideo">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.uploadVideo} />
                                <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                            </div>
                            <div className="input-group-append">
                                <button className="input-group-text" id="inputGroupFileAddon02" onClick={this.submitVideo}>Upload</button>
                            </div>
                        </div>
                        <div className=" embed-responsive embed-responsive-16by9">
                            <iframe src={this.state.lectures} />
                        </div>
                    </div>
                </div>

            )
        }
    }
}


export default Videos;



// autoplay="false"
// autostart="false" 
// autoplay="0" 
// autostart="0"