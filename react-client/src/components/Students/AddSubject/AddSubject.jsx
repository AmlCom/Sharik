import React, { Component } from 'react';
import Student from '../Student.js'

class AddSubject extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {

		return (
			<div>
				<Student/>
				<h1>Student AddSubject Page</h1>
			</div>

		)
	}
}

export default AddSubject