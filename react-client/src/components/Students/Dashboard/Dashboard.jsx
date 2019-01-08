import React, { Component } from 'react';
import Slideshow from '../Slideshow/Slideshow.jsx';
import axios from 'axios';
import '../../Teachers/Teacher.css'

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: []
		}
	}

	componentDidMount() {
		axios.get('get/teacher')
			.then((res) => {
				console.log('respppppp', res.data)
				var teachers = res.data
				console.log('teaa', teachers)
				var array = []
				for (var i = 0; i < teachers.length; i++) {
					if (teachers[i].video.length === 1) {
						array.push(teachers[i].video[0])
					}
					else if (teachers[i].video.length > 1) {
						for (var j = 0; j < teachers[i].video.length; j++) {
							array.push(teachers[i].video[j])
						}
					}
				}

				console.log('jjjj', array.length)
				this.setState({
					videos: array
				})

			})
			.catch((err) => {
				console.log(err)
			})
	}

	render() {

		if (this.state.videos.length === 1) {
			return (
				<div className='container'>
					<iframe className='teacherVideo' src={this.state.videos[0]} />
				</div>

			)
		} else {
			return (
				<div>
					{this.state.videos.map((video) =>
						<div className='container'>
							<div className='videoWrapper'>
							<video controls="true">
								<source src={video} type="video/mp4" />
							</video>
						</div>
						</div>
					)}
				</div>
			)
		}
	}
}

export default Dashboard