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
		required: false,
		default:"https://vignette.wikia.nocookie.net/kalbo-kinis-kintab/images/c/c5/Facebook-default-no-profile-pic.jpg/revision/latest/scale-to-width-down/480?cb=20131120043048"
	},
	video: {
		type :Array,
		required : false,
		default:"https://firebasestorage.googleapis.com/v0/b/homerji-d2145.appspot.com/o/videos%2Fvideoplayback.mp4?alt=media&token=77f5843d-eca0-4b4f-aa4c-42ffa677630b"
	},
	rating:{
		type:Number,
		required: false,
		default:1
	},
	rateCount:{
		type:Number,
		required:false,
		default:0
	},
	User1: [
		{
			type: mongoose.Schema.Types.ObjectId, ref: 'User1' 
		}
	]
});


var Teacher = mongoose.model('teacher', TeacherSchema);


module.exports = Teacher;