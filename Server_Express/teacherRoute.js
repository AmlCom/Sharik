var express = require('express');
var bodyParser = require('body-parser');
var Teacher = require('../DB/MongoDB/schema/teacherSchema')
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
  console.log('you reached mustafa',req.body)

console.log('rating helllo rating', req.body.name)
// Teacher.findOneAndUpdate({'firstname':req.body.name},{'rating':req.body.rating}).then(function (teacher) {
//   console.log('teacheer',teacher)
//   //res.send('hello')
//   res.send(teacher)
// }).catch(next)
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


module.exports = router