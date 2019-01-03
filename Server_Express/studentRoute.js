const express = require('express')
const router = express.Router()
const passport = require('passport');
require('./passport/googleStudent.js');
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


router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect',
  passport.authenticate('facebook', { successRedirect: '/student',
                                      failureRedirect: '/singin' }));


module.exports = router;