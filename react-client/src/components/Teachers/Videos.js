import React, { Component } from 'react';
import { storage } from '../../firebase/index'
import axios from 'axios';


class Videos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Loggedin: false,
            email: '',
            password: '',
            video: ''
        }
    }

    componentDidMount() {
        axios.get('/teacher').then((res) => {
            console.log("res", res);
            this.setState({
                video: res.data[0].video
            })

        }).catch((err) => {
            console.log('hi', err)
        })
      }

      uploadVideo = (e) => {
          console.log('eeee',e.target.files[0])
        this.setState({
            video: e.target.files[0]
        })
        console.log('video',this.state.video)
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
                this.setState({
                    video: url
                })
            })
        });
    }

    render() {
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

                <iframe src={this.state.video} />


            </div>
        )
    }
}


export default Videos;

