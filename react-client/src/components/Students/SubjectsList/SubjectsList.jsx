import React, { Component } from 'react';
import Student from '../Student.js'

class SubjectsList extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {

		return (
			<div>
				<Student/>
				<h1>Student SubjectsList Page</h1>
			</div>

		)
	}
}

export default SubjectsList