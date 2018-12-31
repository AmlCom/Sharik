// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

<<<<<<< HEAD
// //create profile schema and model for the teacher
// const TeacherSchema = new Schema({
//     teacherName: {
//         type: String,
//         required: [true, 'Name Field is Required']
//     }

//     // teacherMajor: {
//     //     type: String,
//     //     required: [true, 'Name Field is Required']
//     // },

//     // info: {
//     //     type: String,
//     //     required: [true, 'Name Field is Required']
//     // },

//     // price: {
//     //     type: Number,
//     //     required: [true, 'Name Field is Required']
//     // },

//     // picURL: {
//     //     type: String,
//     //     required: [true, 'Name Field is Required']
//     // }
// });
=======
//create profile schema and model for the teacher
const TeacherSchema = new Schema({
    teacherName: {
        type: String,
        required: [true, 'Name Field is Required']
    },

    teacherMajor: {
        type: String,
        required: [true, 'Name Field is Required']
    },

    info: {
        type: String,
        required: [true, 'Name Field is Required']
    },

    price: {
        type: Number,
        required: [true, 'Name Field is Required']
    },

    image: {
        type: String,
        required: [true, 'Name Field is Required']
    }
});
>>>>>>> f9013ff3de222cc65f721ef5910c530aa3bd64d8



// var Teacher = mongoose.model('teacher', TeacherSchema);
// module.exports = Teacher;
