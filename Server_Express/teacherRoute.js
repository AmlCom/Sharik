var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router()
const Teacher = require('../DB/MongoDB/schema/teacherSchema')
const signupuser = require('../DB/MongoDB/schema/sharik_db__users_schema.js');

mongoose.Promise = global.Promise;




// get a list for all events from the db
router.get('/teacher', function (req, res, next) {
  console.log('you reached me')
  Teacher.find({}).then(function (teacher) {
    res.send(teacher)
  }).catch(next)
});


//add new event to the db
router.post('/teacher', function (req, res, next) {

  console.log('you reached mustaf')

  res.send('hi there')

    Teacher.create(req.body).then(function (teacher) {
    res.send(teacher)
  }).catch(next)
});

//find specific teacher or teachers

router.post('/specTeacher', function (req, res, next) {
  console.log('cool thing are happening')
  console.log(req.body.name)
  Teacher.findOne({'firstname':req.body.name}).then(function (teacher) {
    console.log('teacheer',teacher)
    //res.send('hello')
    res.send(teacher)
  }).catch(next)
});

//update teacher profile picture

router.post('/updateTeacherProfile', function (req, res, next) {
  //console.log('yaya is here')
  console.log('yaya is here',req.body)
  console.log('image',req.body.image)
  Teacher.findOneAndUpdate({'firstname':req.body.name},{'image':req.body.image}).then(function (teacher) {
    console.log('teacheer',teacher)
    //res.send('hello')
    res.send(teacher)
  }).catch(next)
});

//teacher can add video lecture 
router.post('/addVideoLecture', function (req, res, next) {
  console.log('videos',req.body.videos)
  Teacher.findOneAndUpdate({'firstname':req.body.name},{'video':req.body.videos}).then(function (teacher) {
    console.log('teacheer',teacher)
    //res.send('hello')
    res.send(teacher)
  }).catch(next)
});

// teacher rating 
router.post('/ratingTeacher', function(req, res, next) {
  console.log('-------you reached mustafa--------',req.body)

console.log('rating helllo rating', req.body.name)
Teacher.findOneAndUpdate({'firstname':req.body.name},{'rating':req.body.rating}).then(function (teacher) {
  console.log('teacheer',teacher)
  //res.send('hello')
  res.send(teacher)
}).catch(next)
});

router.post('/comment', function (req, res, next) {

  console.log('you reached yahya')
   console.log('comments',req.body)
   console.log('commelll',req.body.comment)
   console.log('name',req.body.comment[0].teacherName)
  Teacher.findOneAndUpdate({'firstname':req.body.comment[0].teacherName},{'comments':req.body.comment}).then(function (teacher) {
    console.log('teacheer',teacher)
    //res.send('hello')
    res.send(teacher)
  }).catch(next)
});

router.post('/schedule', function (req, res, next) {
  console.log('req.body',req.body)
  Teacher.findOneAndUpdate({'firstname':req.body.teacher},{'acceptedRequests':req.body.student}).then(function (teacher) {
    console.log('teacheer',teacher)
    //res.send('hello')
    res.send(teacher)
  }).catch(next)
});


router.get('/studentList', (req, res) => {
  Teacher.findOne({ email: req.session.passport.user.email }, (err, teacher) => {
      if (err) {
          res.send(err);
      } else {
          signupuser.find({ _id: { $in: teacher.User1 } }, (err, studentsList) => {
              if (err) {
                  res.send(err);
              } else {
                  res.send(studentsList)
              }
          })
      }
  })
})


router.post('/reject', (req, res) => {
  Teacher.findOne({ _id: req.session.passport.user._id }, (err, teacher) => {
      let students = teacher.User1;
      for (var i = 0; i < students.length; i++) {
          if (req.body.studentId === String(students[i])) {
              students.splice(i, 1);
          }
      }
      Teacher.findOneAndUpdate({ _id: req.session.passport.user._id }, { User1: students }, (err, user) => {
          // res.send(user);
      })
  })
  signupuser.findOne({ _id: req.body.studentId }, (err, student) => {
      let studentMessage = student.messages;
      studentMessage.push(`${req.session.passport.user.firstname} has refused your request`);
      signupuser.findOneAndUpdate({ _id: req.body.studentId }, { messages: studentMessage }, (err, user) => {
          res.send('finally');
      })
  })
})

router.post('/accept', (req, res) => {
  Teacher.findOne({ _id: req.session.passport.user._id }, (err, teacher) => {
      let students = teacher.User1;
      for (var i = 0; i < students.length; i++) {
          if (req.body.studentId === String(students[i])) {
              students.splice(i, 1);
          }
      }
      Teacher.findOneAndUpdate({ _id: req.session.passport.user._id }, { User1: students }, (err, user) => {
          // res.send(user);
      })
  })
  signupuser.findOne({ _id: req.body.studentId }, (err, student) => {
      let studentMessage = student.messages;
      studentMessage.push(`${req.session.passport.user.firstname} has accepted your request`);
      signupuser.findOneAndUpdate({ _id: req.body.studentId }, { messages: studentMessage }, (err, user) => {
          res.send('finally');
      })
  })
})

router.post('/send', (req, res) => {
  console.log('finish', req.body);
  res.end();
})

module.exports = router