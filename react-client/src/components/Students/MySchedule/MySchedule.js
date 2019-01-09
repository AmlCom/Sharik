import React, { Component } from 'react';
import axios from 'axios'
import Nav from '../../Nav'

class MySchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages:null
		}
	}

	componentDidMount() {
		axios.get('/auth/checkLogging').
			then((res) => {
				console.log('kkk', res.data.messages)
				this.setState({
					messages: res.data.messages
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
		}else {
		return (
			<div>
				<Nav />
				{this.state.messages.map((message) => {
					var array = message.split(' ')
					var teacher = array[0]
					var accepted = array[2]
					 array.shift()
					 var message = array.join(' ')

					 if(accepted === 'accepted'){
						return (
							<div className=''>
								<ul className=''><span></span>
									<li >
										<li className="card commentsCard" >
											<h5 className="card-header">{teacher} </h5>
											<div className="card-body">
												<p className="card-text">{message}</p><button>Call</button>
											</div>
										</li>
									</li>
								</ul>
							</div>
						)
					 }else {
						return (
							
							<div className=''>
								<ul className=''><span></span>
									<li >
										<li className="card commentsCard" >
											<h5 className="card-header">{teacher} </h5>
											<div className="card-body">
												<p className="card-text">{message}</p>
												<button>Delete</button>
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