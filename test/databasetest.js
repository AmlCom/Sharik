const assert = require('assert');
// const db = require('../database-mongo/index.js');
var request = require('supertest');
var mocha = require('mocha');
const signupuser = require('../DB/MongoDB/schema/sharik_db__users_schema.js');
const Teacher = require('../DB/MongoDB/schema/teacherSchema')
const express = require('express')





describe('save',function(){  
  //save to database to see it is saving or not
	it('save to database',function(){
    	const signupuser1 = new signupuser({
                firstname: 'Anyone',
                lastname: 'not important',
                email: 'he@gmail.com',
                password:  'afsdg'
              });

              signupuser1.save().then(function(){
        	  assert(signupuser1.isNew === false);
    	});

	});

//delete one from the database to check if you can remove specific one
	it('Delete specific one from the database', function(){
    	signupuser.findOneAndRemove({email:'he@gmail.com'}).then(function(){
			signupuser.findOne({email:'he@gmail.com'}).then(function(result){
        		assert(result === null);
      		});
    	});
  	});

  //update one 

  it('Updates the saved data', function(){
    signupuser.findOneAndUpdate({email:'he@gmail.com'}, {email: 'None'}).then(function(){
		signupuser.findOne({_id: signupuser1._id}).then(function(result){
              assert(result.email === 'None');
          });
      });
  });

  //save new teacher to database
  it('save new Teacher to database',function(){
    const newTeacher = new Teacher({
            firstname: 'Yahye',
            lastname: 'Farag',
            email: 'yahya@gmail.com',
            password:  'yahya1234'
          });

          newTeacher.save().then(function(){
          assert(newTeacher.isNew === false);
    });
    
    //Delete specific teacher from the database based on his name
    it('Delete specific teacher from the database', function(){
    	Teacher.findOneAndRemove({firstname:'Yahye'}).then(function(){
			Teacher.findOne({firstname:'Yahye'}).then(function(result){
        		assert(result === null);
      		});
    	});
      });
    
      //update the name of specific teacher in the database
      it('Updates the saved data', function(){
        Teacher.findOneAndUpdate({firstname:'Yahye'}, {firstname: 'Ahmed'}).then(function(teacher){
            Teacher.findOne({_id: teacher._id}).then(function(result){
                  assert(result.email === 'None');
              });
          });
      });

});


});

describe('Server Test', function () {

    describe('Connection Test', function () {
        it('Should have a response from the server ', function (done) {
            request('http://127.0.0.1:3000').get('/').expect(200, done)
        })
        it('should resived error from the server with wrong path ', function (done) {
            request('http://127.0.0.1:3000').get('/wrong').expect(404, done)
        });
    });
});

describe('POST', function () {

    it('should register users ', function (done) {
        request('http://127.0.0.1:3000').post('/signup').expect(200).send({
            name: 'dana',
            major: 'hhhhh',
            email: 'dana@gfgf.com',
            username: 'dd',
            password: '3333',
            description:'wow',
            phoneNumber: '072852',
        }).end(function (err, res) {
            done()

        })
    })
})
describe('POST', function () {

    it('users login', function (done) {
        request("http://127.0.0.1:3000")
          .post("/login")
          .send({
            email: "dana",
            password: "1232"
          })
          .end(function(err, res) {
            done();
          });
    });
});

describe('Contact  support', function () {
	
	describe('POST User', function(done){
			it('Should support the users', function(done){
		// create account for the username
		request('http://localhost:3000').post("/S_Contact")
		.expect(200)
		.send({
			"title": "mobile",
    		"email": "m@gmail.com",
    		"message": "hello"
			})
		.end(done)
		});
	});
});


