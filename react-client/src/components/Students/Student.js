import React, { Component } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';

import Button from '@material-ui/core/Button';


import { withStyles } from '@material-ui/core/styles';


import Dashboard from './Dashboard/Dashboard.jsx';
import SubjectsList from './SubjectsList/SubjectsList.jsx';
import AddSubject from './AddSubject/AddSubject.jsx';
import Profile from './Profile/Profile.jsx';
import MySchedule from './MySchedule/MySchedule.jsx';
import MyPayments from './MyPayments/MyPayments.jsx';

const styles = theme => ({
	
});

class Student extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {

		return (
			<div>
				<h1>Student Page</h1>
				<BrowserRouter>
					<div className="App">
						<div>
						<Button color="inherit"><Link to='/Student/'>Dashboard</Link></Button>
						<Button color="inherit"><Link to='/Student/SubjectsList'>Subjects List</Link></Button>
						<Button color="inherit"><Link to='/Student/AddSubject'>Add Subject</Link></Button>
						<Button color="inherit"><Link to='/Student/Profile'>Profile</Link></Button>
						<Button color="inherit"><Link to='/Student/MySchedule'>MySchedule</Link></Button>
						<Button color="inherit"><Link to='/Student/MyPayments'>MyPayments</Link></Button>

							<Switch>
								<Route path='/Student/' exact component={Dashboard} />
								<Route path='/Student/SubjectsList' exact component={SubjectsList} />
								<Route path='/Student/AddClass' exact component={AddSubject} />
								<Route path='/Student/Profile' exact component={Profile} />
								<Route path='/Student/MySchedule' exact component={MySchedule} />
								<Route path='/Student/MyPayments' exact component={MyPayments} />
							</Switch>
						</div>
					</div>

				</BrowserRouter>

			</div>

		)
	}
}

export default withStyles(styles)(Student);

