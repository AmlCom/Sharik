var express = require('express');
var bodyParser = require('body-parser');
var Teacher = require('../DB/MongoDB/schema/teacherDB')
const mongoose = require('mongoose');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost/teacher')

mongoose.Promise = global.Promise;

var db = mongoose.connection;


db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});


// get a list for all events from the db
app.get('/teacher', function (req, res, next) {
  Teacher.find({}).then(function (teacher) {
    res.send(teacher)
  }).catch(next)
});


//add new event to the db
app.post('/teacher', function (req, res, next) {

    // console.log(req.body) 
    // res.send("hiii ")
    Teacher.create(req.body).then(function (teacher) {
    res.send(teacher)
  }).catch(next)
});


//error handling middleware
app.use(function(err,req,res,next){
    // console.log(err);
    res.status(400).send({error:err.message})
})


//listen for requests

app.listen(process.env.port || 5000,function(){
    console.log('Now listening for requests');
})