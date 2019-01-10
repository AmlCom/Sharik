// React:
// -----
import React, { Component } from 'react';

// import update from 'immutability-helper';


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

// Image Upload:
// import Upload from 'material-ui-upload/Upload';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap"
	},

	input: {
		margin: theme.spacing.unit
	},

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

	// Constarctor:
	constructor(props) {
		super(props);
		this.state = {

			infoDB: {
				_id: '',
				avatarImg: '',

				username: '', 			// 	required: true

				firstname: '', 		// 	required: false

				middlenames: '',
				lastname: '', 			// 	required: false
				email: '', 			// 	required: false
				password: '', 					// 	required: false
				imageURL: '', 					// 	required: false
				isTeacher: false, 				//	type: Boolean,required: false

				phonenumber: '', // 	required: false

				bio: '',
				// 'A biography needs no explanation. It is a summary of a person\'s life. You would have come across outline templates or standard writing templates for biographies that state the information about the person in exceptional detail. In general, any regular or speaker biography includes the basic details about the person, his education, work, hobbies, etc. More often than not, students are confused about what to include and where it should be included. It is always beneficial to use a standardized template with proper guidelines so that you can come up with a good biography. And as a student, you will be expected to write a biography on anyone, ranging from a political figure to an actress to a business magnate to a civilian. Here are some standard templates that you can use for your reference.',
				// 	required: false
				imageData: {},					// 	required: false

			},

			infoForm: {
				avatarImg: '',
				username: '',
				firstname: '',
				middlenames: '',
				lastname: '',
				email: '',
				password: '',
				imageURL: '',
				isTeacher: false,
				phonenumber: '',
				bio: '',
				imageData: {},
				image:''
			},

			editeProfile: true,

			forceRender: true,
		}
	}

	componentDidMount() {
		axios.get('/auth/checkLogging')
			.then(responseGet => {
				console.log('<<<<<<<<<<<<<<<<');
				console.log('Data:')
				console.log('@ >> Sharik/react-client/src/components/Students/Profile/Profile.jsx');
				console.log('@ >> componentDidMount()')
				console.log('@ >> axios.get(\'/auth/checkLogging\')');
				console.log('Response Data:');
				console.log(responseGet.data)
				console.log('>>>>>>>>>>>>>>>>');
				if (responseGet.data) {
					console.log('response.data._id', responseGet.data._id);
					this.state.infoDB._id = responseGet.data._id;
					axios.post('/S_Get_Student_Info', { _id: responseGet.data._id })
						.then(responsePost => {
							console.log('<<<<<<<<<<<<<<<<');
							console.log('Data:');
							console.log('@ >> Sharik/react-client/src/components/Students/Profile/Profile.jsx');
							console.log('@ >> componentDidMount()');
							console.log('@ >> axios.post(/S_Get_User_Info)');
							console.log('Response Data msg:');
							console.log(responsePost.data[0]);
							console.log('>>>>>>>>>>>>>>>>');

							if (responsePost.data) {

								this.state.infoDB.avatarImg = responsePost.data[0].avatarImg || 'data:image/jpeg;base64,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';
								this.state.infoDB.username = responsePost.data[0].username || '';
								this.state.infoDB.firstname = responsePost.data[0].firstname || '';
								this.state.infoDB.middlenames = responsePost.data[0].middlenames || '';
								this.state.infoDB.lastname = responsePost.data[0].lastname || '';
								this.state.infoDB.email = responsePost.data[0].email || '';
								this.state.infoDB.imageURL = responsePost.data[0].imageURL || '';
								this.state.infoDB.phonenumber = responsePost.data[0].phonenumber || '';
								this.state.infoDB.bio = responsePost.data[0].bio || 'A biography needs no explanation. It is a summary of a person\'s life. You would have come across outline templates or standard writing templates for biographies that state the information about the person in exceptional detail. In general, any regular or speaker biography includes the basic details about the person, his education, work, hobbies, etc. More often than not, students are confused about what to include and where it should be included. It is always beneficial to use a standardized template with proper guidelines so that you can come up with a good biography. And as a student, you will be expected to write a biography on anyone, ranging from a political figure to an actress to a business magnate to a civilian. Here are some standard templates that you can use for your reference.';
								this.state.infoDB.imageData = responsePost.data[0].imageData || {};

								for (let key in this.state.infoDB) {
									this.state.infoForm[key] = this.state.infoDB[key];
								}

								console.log('this.state.infoDB', this.state.infoDB);
								console.log('this.state.infoForm', this.state.infoForm);

								this.setState({
									forceRender: true,
								})

							} else {

							}
						})
						.catch(postError => {
							console.log('<<<<<<<<<<<<<<<<');
							console.log('Error:');
							console.log('@ >> Sharik/react-client/src/components/Students/Profile/Profile.jsx');
							console.log('@ >> componentDidMount()');
							console.log('@ >> axios.post(/S_Get_User_Info)');
							console.log('Response Error msg:');
							console.log(postError);
							console.log('>>>>>>>>>>>>>>>>');
						})


				} else {
					console.log('');

				}
			})
			.catch(getError => {
				console.log('<<<<<<<<<<<<<<<<');
				console.log('Error:')
				console.log('@ >> Sharik/react-client/src/components/Students/Profile/Profile.jsx');
				console.log('@ >> componentDidMount()')
				console.log('@ >> axios.get(\'/auth/checkLogging\').catch');
				console.log('Response Error msg:')
				console.log(getError)
				console.log('>>>>>>>>>>>>>>>>');
			})

	}


	// onFormChange = (event, value) => {
	// 	event.preventDefault();
	// 	// this.setState({ value });
	// 	console.log(event, value)
	// };


	onFormEdite = () => {
		this.setState({
			editeProfile: !this.state.editeProfile,
		})
	}

	onFormSubmit = (event) => {
		event.preventDefault();
		for (let key in this.state.infoForm) {
			this.state.infoDB[key] = this.state.infoForm[key];
		}

		// this.setState({
		// 	forceRender: true
		// });

		this.setState({
			editeProfile: !this.state.editeProfile,
		});

		axios.post('/S_Set_Student_Info', this.state.infoDB)
			.then(responsePost => {
				console.log('<<<<<<<<<<<<<<<<');
				console.log('Data:');
				console.log('@ >> Sharik/react-client/src/components/Students/Profile/Profile.jsx');
				console.log('@ >> onFormSubmit');
				console.log('@ >> axios.post(/S_Set_Student_Info, ...)');
				console.log('Response Data msg:');
				console.log(responsePost);
				console.log('>>>>>>>>>>>>>>>>');

				if (responsePost.data) {

				} else {

				}
			})
			.catch(postError => {
				console.log('<<<<<<<<<<<<<<<<');
				console.log('Error:');
				console.log('@ >> Sharik/react-client/src/components/Students/Profile/Profile.jsx');
				console.log('@ >> onFormSubmit');
				console.log('@ >> axios.post(/S_Set_Student_Info)');
				console.log('Response Error msg:');
				console.log(postError);
				console.log('>>>>>>>>>>>>>>>>');
			})
	}

	// onImageLoad = (e, file) => {
	// 	console.log('Image Uploded!');
	// 	console.log(e.target.result, file);
	// 	console.log(this.imageData)
	// }
	uploadImage = (e) => {
        //console.log('check hello', hello)
        this.setState({
            image: e.target.files[0]
        })
	}
	submitImage = () => {
	var image = this.state.image
	const uploadTask = storage.ref(`images/${image.name}`).put(image)
	uploadTask.on('state_changed', (snapshot) => {

	}, (error) => {
		console.log(error)
	}, () => {
		storage.ref('images').child(image.name).getDownloadURL().then(url => {
			console.log('url', url)
			var obj = { name: user, image: url }
			axios.post('get/updateTeacherProfile', obj)
				.then((res) => {
					this.setState({
						image: res.data.image
					})
				})
				.catch((err) => {
					console.log(err)
				})
		})
	});
}

	render() {
		const { classes } = this.props;
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
										image={this.state.infoDB.avatarImg}
										title="Contemplative Reptile"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{this.state.infoDB.firstname + ' ' + this.state.infoDB.lastname}
										</Typography>
										<Typography component="p">
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									
								<div className="input-group mb-3">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.uploadImage} />
                                    <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <button className="input-group-text" id="inputGroupFileAddon02" onClick={this.submitImage}>Upload</button>
                                </div>
                            </div>
									<Button size="small"
										type='file'
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
										{/* <InputLabel htmlFor="username">User Name</InputLabel> */}
										<TextField id="username"
											label="User Name"
											name="username"
											label="User Name"
											autoComplete="username"
											value={this.state.infoForm.username}
											onChange={e => this.setState({ infoForm: { username: e.target.value } })}
											disabled={this.state.editeProfile}
										/>
									</FormControl>

									<FormControl margin="normal" required fullWidth>
										{/* <InputLabel htmlFor="firstname">First Names</InputLabel> */}
										<TextField id="firstname"
											name="firstname"
											label="First Name"
											autoComplete="firstname"
											value={this.state.infoForm.firstname}
											onChange={e => this.setState({ infoForm: { firstname: e.target.value } })}
											disabled={this.state.editeProfile}
										/>
									</FormControl>

									<FormControl margin="normal" required fullWidth>
										{/* <InputLabel htmlFor="middlenames">Middle Names</InputLabel> */}
										<TextField id="middlenames"
											name="middlenames"
											label="Middle Names"
											autoComplete="middlenames"
											value={this.state.infoForm.middlenames}
											onChange={e => this.setState({ infoForm: { middlenames: e.target.value } })}
											disabled={this.state.editeProfile}
										/>
									</FormControl>

									<FormControl margin="normal" required fullWidth>
										{/* <InputLabel htmlFor="lastname">Last Name</InputLabel> */}
										<TextField id="lastname"
											name="lastname"
											label="BiogrLast Nameaphy"
											autoComplete="lastname"
											value={this.state.infoForm.lastname}
											onChange={e => this.setState({ infoForm: { lastname: e.target.value } })}
											disabled={this.state.editeProfile}
										/>
									</FormControl>

									<FormControl margin="normal" required fullWidth>
										{/* <InputLabel htmlFor="email">Email Address</InputLabel> */}
										<TextField id="email"
											name="email"
											label="Email Address"
											autoComplete="email"
											value={this.state.infoForm.email}
											onChange={e => this.setState({ infoForm: { email: e.target.value } })}

											disabled={this.state.editeProfile}
										/>
									</FormControl>
									<FormControl margin="normal" required fullWidth>
										<TextField
											id="filled-multiline-flexible"
											label="Biography"
											multiline
											rowsMax="10"
											name="bio"
											value={this.state.infoForm.bio}
											onChange={e => this.setState({ infoForm: { bio: e.target.value } })}
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
												<div>


													<FormControl margin="normal" required fullWidth>
														<Button
															fullWidth
															variant="contained"
															color="primary"
															className={classes.submit}
															onClick={that.onFormSubmit.bind(that)}
														>
															Submit Change
															</Button>
													</FormControl>
												</div>
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

