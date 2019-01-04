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

  //   Teacher.create(req.body).then(function (teacher) {
  //   res.send(teacher)
  // }).catch(next)
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


module.exports = router