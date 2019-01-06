import React, { Component } from 'react';
import { storage } from '../../firebase/index'
import axios from 'axios';

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
                if (response.data.passport) {
                    user = response.data.passport.user.firstname
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
                        isTeacher: response.data.passport.user.isTeacher,
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
                <div className='container'>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.uploadVideo} />
                            <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                        </div>
                        <div className="input-group-append">
                            <button className="input-group-text" id="inputGroupFileAddon02" onClick={this.submitVideo}>Upload</button>
                        </div>
                    </div>
                    <iframe className='teacherVideo'  src={this.state.lectures[0]} />
                </div>
            )
        } else if (this.state.lectures.length > 1) {
            return (
                <div className='container'>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.uploadVideo} />
                            <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                        </div>
                        <div className="input-group-append">
                            <button className="input-group-text" id="inputGroupFileAddon02" onClick={this.submitVideo}>Upload</button>
                        </div>
                    </div>
                
                    {this.state.lectures.map((video) =>
                        <iframe className='teacherVideo' src={video} />
                    )}
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.uploadVideo} />
                            <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                        </div>
                        <div className="input-group-append">
                            <button className="input-group-text" id="inputGroupFileAddon02" onClick={this.submitVideo}>Upload</button>
                        </div>
                    </div>
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe className='teacherVideo' src={this.state.lectures} />
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