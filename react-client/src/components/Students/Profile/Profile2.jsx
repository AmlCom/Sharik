// React:
// -----
import React, { Component } from 'react';

// GET /POST:
// ---------
import axios from 'axios';

// Material UI:
// -----------
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



// Grid System:
import Grid from '@material-ui/core/Grid';

// Avatar (Img):
import Avatar from '@material-ui/core/Avatar';

// 
import Paper from '@material-ui/core/Paper';

// Card (To holde Img with basic Info):
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},

	// Avatar Style:
	avatar: {
		margin: 10,
	},
	bigAvatar: {
		margin: 10,
		width: 250,
		height: 250,
	},

	// Paper Style:
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},

	// Card Style:
	card: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
});

//

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarImg: 'data:image/jpeg;base64,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',


			username: 'User Name', 	// 	required: true

			//	generalId: 'String', 	// 	required: false

			firstname: 'givenName', 	// 	required: false

			middlenames: 'Middle Names',
			lastname: 'surName', 	// 	required: false
			email: 'Your email address', 	// 	required: false
			password: 'PassWord', 	// 	required: false
			imageURL: 'Your image URL', 	// 	required: false
			isTeacher: false, 	//	type: Boolean,required: false

			phonenumber: 'Your Phone Number', 	// 	required: false

			bio: 'A biography needs no explanation. It is a summary of a person\'s life. You would have come across outline templates or standard writing templates for biographies that state the information about the person in exceptional detail. In general, any regular or speaker biography includes the basic details about the person, his education, work, hobbies, etc. More often than not, students are confused about what to include and where it should be included. It is always beneficial to use a standardized template with proper guidelines so that you can come up with a good biography. And as a student, you will be expected to write a biography on anyone, ranging from a political figure to an actress to a business magnate to a civilian. Here are some standard templates that you can use for your reference.',

			editeProfile: true,



		}
	}

	onFormChange = (event, value) => {
		this.setState({ value });
	};

	onFormEdite = ()=> {
		this.setState({
			editeProfile: !this.state.editeProfile,
		})
	}
	onFormSubmit = (event) => {
		if (this.state.email === '') {
			alert('email cannot be empty');
		} else if (this.state.password === '') {
			alert('password cannot be empty');
		} else {
			event.preventDefault()
			const data = {
				email: this.state.email,
				password: this.state.password
			}

			// axios.post('/auth/signin', check)
			// 	.then(response => {
			// 		console.log('ert', response.data)
			// 		if (response.data) {
			// 			console.log('ezvfdgf')

			// 			this.setState({
			// 				isTeacher: true
			// 			})
			// 		} else {
			// 			this.setState({
			// 				isTeacher: false
			// 			})
			// 		}
			// 	})
		}
	}

	render() {
		const { classes } = this.props;
		const { stateX } = this.state;
		const that = this;

		return (
			<div>

				<div className={classes.root}>
					<Grid container spacing={24}>
						<Grid item xs={12}>
							<Paper className={classes.paper}><h1>My Profile Page (Student)</h1></Paper>
						</Grid>
						<Grid item xs={3}>
							{/* <Paper className={classes.paper}><Avatar alt="Remy Sharp" src={this.state.avatarImg} className={classes.bigAvatar} /></Paper> */}
							<Card className={classes.card}>

								<CardActionArea>
									<CardMedia
										className={classes.bigAvatar}
										image={this.state.avatarImg}
										title="Contemplative Reptile"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{this.state.firstname + ' ' + this.state.lastname}
										</Typography>
										<Typography component="p">
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Button size="small" 
											color="primary"
											onClick={that.onFormEdite}
											>
										Edit Profile
        							</Button>
								</CardActions>
							</Card>
						</Grid>
						<Grid item xs={9}>
							<Paper className={classes.paper}>
								<form className={classes.form}>

									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="username">User Name</InputLabel>
										<Input id="username"
											name="username"
											autoComplete="username"
											value={this.state.username}
											onChange={this.onFormChange}
											disabled={this.state.editeProfile}
										/>
									</FormControl>

									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="firstname">First Names</InputLabel>
										<Input id="firstname"
											name="firstname"
											autoComplete="firstname"
											value={this.state.firstname}
											onChange={this.onFormChange}
											disabled={this.state.editeProfile}
										/>
									</FormControl>

									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="middlenames">Middle Names</InputLabel>
										<Input id="middlenames"
											name="middlenames"
											autoComplete="middlenames"
											value={this.state.middlenames}
											onChange={this.onFormChange}
											disabled={this.state.editeProfile}
										/>
									</FormControl>

									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="lastname">Last Name</InputLabel>
										<Input id="lastname"
											name="lastname"
											autoComplete="lastname"
											value={this.state.lastname}
											onChange={this.onFormChange}
											disabled={this.state.editeProfile}
										/>
									</FormControl>

									<FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="email">Email Address</InputLabel>
										<Input id="email"
											name="email"
											autoComplete="email"
											value={this.state.email}
											onChange={this.onFormChange}
											disabled={this.state.editeProfile}
										/>
									</FormControl>
									<FormControl margin="normal" required fullWidth>
										<TextField
											id="filled-multiline-flexible"
											label="Biography"
											multiline
											rowsMax="10"
											value={this.state.bio}
											onChange={this.onFormChange}
											className={classes.textField}
											margin="normal"
											helperText=""
											variant="filled"
										/>
									</FormControl>					{/* <FormControl margin="normal" required fullWidth>
										<InputLabel htmlFor="password">Password</InputLabel>
										<Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.onFormChange} />
									</FormControl> */}
									{
										!this.state.editeProfile && (function () {

											return (
												<Button
													fullWidth
													variant="contained"
													color="primary"
													className={classes.submit}
													onClick={that.onFormSubmit}
												>
													Submit Change
												</Button>
											)

										})()
									}

								</form>
							</Paper>
						</Grid>

					</Grid>
				</div>

			</div>

		)
	}
}

Profile.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
