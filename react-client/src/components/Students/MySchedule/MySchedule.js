import React, { Component } from 'react';
import axios from 'axios'
import Nav from '../../Nav'
import './MySchedule.css'
import Student from '../Student.js'

class MySchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages:null,
			studentId:null
		}
	}

	componentDidMount() {
		axios.get('/auth/checkLogging').
			then((res) => {
				console.log('kkk', res.data)
				this.setState({
					messages: res.data.messages,
					studentId:res.data._id
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	deleteClicked = (message) => {
		console.log('messagggge',message)
		for(var i = 0 ; i < this.state.messages.length ; i++) {
			if(this.state.messages[i] === message) {
				this.state.messages.splice(i,0)
			}
		}
		console.log('after delete', this.state.messages)
	}

	messageClicked = (teacherName) => {
		console.log('yy',teacherName)
		axios.post('/get/specTeacher',{name:teacherName})
		.then((res) => {
			console.log('messageiscli',res.data._id)
            this.props.history.push({
                pathname: '/video',
                state: { detail: {studentid:this.state.studentId,teacherid:res.data._id} }
              })
		})
		.catch((err) => {
			console.log(err)
		})
	}

	render() {
		console.log('nnnnn',this.state.messages)
		if(this.state.messages === null) {
			return (
				<h5>Loading....</h5>
			)
		} else {
		return (
			<div>
				<Student/>
				{this.state.messages.map((message) => {
					var array = message.split(' ')
					var teacher = array[0]
					var accepted = array[2]
					 array.shift()
					 var message = array.join(' ')

					 if(accepted === 'accepted'){
						return (
							<div className='container'>
								<ul className=''>
									<li >
										<li className="card commentsCard" >
											<h5 className="card-header">{teacher} </h5>
											<div className="card-body">
												<p className="card-text">{message}</p>
												<button className ='videoCallBtn' ref="buttonJoin" id="button-join" 
												onClick = {() => {this.messageClicked(teacher)}}>Message/Call</button>
											</div>
										</li>
									</li>
								</ul>
							</div>
						)
					 }else {
						return (
							
							<div className='container'>
								<ul className=''>
									<li >
										<li className="card commentsCard" >
											<h5 className="card-header">{teacher} </h5>
											<div className="card-body">
												<p className="card-text">{message}</p>
												<button className ='videoDeleteBtn'ref="buttonJoin" id="button-join" 
												onClick = {() =>{this.deleteClicked(teacher+' '+message)}}
												>Delete</button>
											</div>
										</li>
									</li>
								</ul>
							</div>
						)

					 }
				})}
			</div>
		    )
		}
	}
}

export default MySchedule