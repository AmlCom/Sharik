import React, { Component } from 'react';
import Slideshow from '../Slideshow/Slideshow.jsx';
import axios from 'axios';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos:[]
		}
	}

	componentDidMount() {
        axios.get('get/teacher')
            .then((res) => {
				console.log('respppppp',res.data)
				var teachers = res.data
				console.log('teaa',teachers)
				var array = []
				for(var i = 0 ; i< teachers.length ; i++) {
					if(teachers[i].video.length === 1) {
						array.push(teachers[i].video[0])
					}
					else if(teachers[i].video.length > 1) {
						for(var j = 0 ; j < teachers[i].video.length ; j++) {
							array.push(teachers[i].video[j])
						}
					}
				}

				console.log('jjjj',array.length)
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
						<iframe className='teacherVideo'  src={this.state.videos[0]} />
					</div>
				
			)
        } else {
            return (
                <div>
                    {this.state.videos.map((video) =>
                       <div className='container'>
					   <iframe className='teacherVideo'  src={video} />
				   </div> 
                    )}
                </div>
            )
        }



			// return (
			// 	<div>
			// 		<h1>Student Dashboard Page</h1>
			// 		{/* <Slideshow /> */}
	
			// 		<div className='container'>
			// 			<iframe className='teacherVideo'  src="https://firebasestorage.googleapis.com/v0/b/homerji-d2145.appspot.com/o/videos%2Fvideoplayback.mp4?alt=media&token=77f5843d-eca0-4b4f-aa4c-42ffa677630b" />
			// 		</div>
			// 	</div>
			// )



	 }
}

export default Dashboard