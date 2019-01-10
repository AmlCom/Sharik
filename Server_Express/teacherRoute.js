var express = require('express');
var bodyParser = require('body-parser');
var Teacher = require('../DB/MongoDB/schema/teacherSchema')
var Student = require('../DB/MongoDB/schema/sharik_db__users_schema')
const mongoose = require('mongoose');
const router = express.Router()

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
console.log('rating',req.body.rating)
console.log('count',req.body.count)
res.send('hello world')
Teacher.findOneAndUpdate({'firstname':req.body.name},{'rating':req.body.rating},{'rateCount':req.body.count}).then(function (teacher) {
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

//update student profile picture

router.post('/updateStudentProfile', function (req, res, next) {
  //console.log('yaya is here')
  console.log('yaya is here',req.body)
  console.log('jjjyyyyyy',req.body.image)

  Student.findOneAndUpdate({'firstname':req.body.name},{'image':req.body.image}).then(function (teacher) {
   // console.log('teacheer',teacher)
    //res.send('hello')
    res.send(teacher)
  }).catch(next)
});

module.exports = router