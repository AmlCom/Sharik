import React, { Component } from 'react';
import Student from '../Student.js'
import Nav from '../../Nav.js'

class MyPayments extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {

		return (
			<div >
				<div style={{ height: '100%' }}>
                    <Nav />
                </div>
				<div className='row' style={{ minHeight: document.body.clientWidth}}>
				    <div className='col-md-2'><Student/></div>
				    <div className='col-md-10'>
				        <h1>Student MyPayments Page</h1>
			        </div>
                </div>
			</div>
		)
	}
}

export default MyPayments