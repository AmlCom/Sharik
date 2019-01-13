import React, { Component } from 'react';
import Slideshow from '../Slideshow/Slideshow.jsx';
import axios from 'axios';
import '../../Teachers/Teacher.css'
import Student from '../Student.js'
import Nav from '../../Nav.js'

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
				<div>
					<Student/>
					<div className='container'>
						<iframe className='teacherVideo' src={this.state.videos[0]} />
					</div>
				</div>

			)
		} else {
			return (
				
				<div >
					<div style={{ height: '100%' }}>
							<Nav />
					</div>
					<div className='row' style={{ minHeight: document.body.clientWidth}}>
					<div className='col-md-2'><Student/></div>
					<div className='col-md-10'>
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
					</div>
				</div>
			)
		}
	}
}

export default Dashboard