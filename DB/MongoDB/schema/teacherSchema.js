const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create profile schema and model for the teacher
const TeacherSchema = new Schema({
	firstname: {
		type: String,
		required: false
	},
	lastname: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: false
	},
	imageURL: {
		type: String,
		required: false
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
		required: false
	},
	video: {
		type :String,
		required : false
	}
});


var Teacher = mongoose.model('teacher', TeacherSchema);


module.exports = Teacher;