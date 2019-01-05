const express = require('express')
const router = express.Router()
const passport = require('passport');
require('./passport/googleStudent.js');
const Student = require('../DB/MongoDB/schema/sharik_db__users_schema');
// const User = require('../DB/MongoDB/AuthStudent.js');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/google',
 passport.authenticate('google', { scope: ['profile'] }));

router.get('/redirect', 
 passport.authenticate('google', { failureRedirect: '/singin'
}),
 function(req, res) {
   res.redirect('/student');
 });
 //update student profile name

router.post('/updateStudentProfile', function (req, res, next) {
  //console.log('yaya is here')
  console.log('update student',req.body)
  Student.findOneAndUpdate({'firstname':req.body.name}).then(function (student) {
    console.log('teacheer',student)
    //res.send('hello')
    res.send(student)
  }).catch(next)
});


router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect',
  passport.authenticate('facebook', { successRedirect: '/student',
                                      failureRedirect: '/singin' }));


module.exports = router;