const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create profile schema and model for the teacher
const TeacherSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isTeacher: {
		type: Boolean,
		required: false
	},
	teacherMajor: {
		type: String,
		required: false
	},
	info: {
		type: String,
		required: false
	},
	price: {
		type: Number,
		required: false
	},
	image: {
		type: String,
		required: false,
		default:"https://vignette.wikia.nocookie.net/kalbo-kinis-kintab/images/c/c5/Facebook-default-no-profile-pic.jpg/revision/latest/scale-to-width-down/480?cb=20131120043048"
	},
	video: {
		type :String,
		required : false
	}
});


var Teacher = mongoose.model('teacher', TeacherSchema);


module.exports = Teacher;