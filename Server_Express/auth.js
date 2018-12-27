const express = require('express')
const router = express.Router()
const passport = require('passport');
require('./passport/googleAuth.js');
require('./passport/facebookAuth.js');
const User = require('../DB/MongoDB/index.js');
const signupuser = require('../DB/MongoDB/schema/sharik_db__users_schema.js');
const bcrypt = require("bcrypt-nodejs");


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/google',
 passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/redirect', 
 passport.authenticate('google', { failureRedirect: '/singin', failureFlash: true
}),
 function(req, res) {
  //  console.log('reqUser987', req.user);
  // req.session.user = req.user;
   res.redirect('/HomePage');
 });

router.get('/facebook', passport.authenticate('facebook'));


router.get('/facebook/redirect',
  passport.authenticate('facebook', { successRedirect: '/HomePage',
                                      failureRedirect: '/singin' }));


router.get('/checkLogging', (req, res) => {
  if (req.session.passport) {
    User.findById(req.session.passport.user, (err, user) => {
     res.send(user);
    })
  }
})

router.get('/logout', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/singin',
                                   failureFlash: true })
);
router.post('/signup', (req, res) => {
  console.log('jhg', req);
  var pass;
  bcrypt.hash(req.body.password, null, null, function(err, hash) {
    const signupuser1 = new signupuser({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      password:  hash
    });
    signupuser1.save(function (user) {
      console.log(user)
    });
});
  
  res.send();
})

module.exports = router;
