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
            yahya: [],
            Loggedin: false
        }
    }

    componentDidMount() {
        axios.get('/auth/checkLogging').
            then((response) => {
                console.log('yyyyyy',response.data.passport)
                if (response.data.passport) {
                    user = response.data.passport.user.firstname
                    
                    axios.post('/get/specTeacher',{name:user})
                    .then((res) => {
                        console.log('dataaaa',res.data)
                        this.setState({
                            yahya:res.data.video
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
        console.log('user', user)
        this.setState({
            video: e.target.files[0]
        })
        console.log('video', this.state.videos)
    }
    submitVideo = () => {
        var video = this.state.video
        const uploadTask = storage.ref(`videos/${video.name}`).put(video)
        uploadTask.on('state_changed', (snapshot) => {

        }, (error) => {
            console.log(error)
        }, () => {
            storage.ref('videos').child(video.name).getDownloadURL().then(url => {
                console.log('url', url)
                console.log('yahya', this.state.yahya)
               // var newVideos = this.state.yahya.push(url)
                ////console.log('fffffffff', newVideos)
                this.setState({
                    yahya: [...this.state.yahya,url]
                })
                //////////////////
                console.log('yahyerashid omar', this.state.yahya)
                var obj = { name: user, videos: this.state.yahya }
                console.log('objjjjjjj',obj)

                axios.post('get/addVideoLecture', obj)
                    .then((res) => {
                        console.log('farah jaah', res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })



            })
        });
    }

    render() {
        console.log('renderrrrr', this.state.yahya)
        if (this.state.yahya.length === 1) {
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

                    <iframe src={this.state.yahya[0]} />


                </div>
            )
        } else if (this.state.yahya.length > 1) {
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


                    {this.state.yahya.map((video) =>

                        <iframe src={video} />
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

                    <iframe src={this.state.yahya} />


                </div>
            )
        }
    }
}


export default Videos;

