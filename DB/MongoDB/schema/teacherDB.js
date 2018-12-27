const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create profile schema and model for the teacher
const TeacherSchema = new Schema({
    teacherName: {
        type: String,
        required: [true, 'Name Field is Required']
    }

    // teacherMajor: {
    //     type: String,
    //     required: [true, 'Name Field is Required']
    // },

    // info: {
    //     type: String,
    //     required: [true, 'Name Field is Required']
    // },

    // price: {
    //     type: Number,
    //     required: [true, 'Name Field is Required']
    // },

    // picURL: {
    //     type: String,
    //     required: [true, 'Name Field is Required']
    // }
});



var Teacher = mongoose.model('teacher', TeacherSchema);
module.exports = Teacher;
