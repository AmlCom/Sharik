const express = require('express')
const router = express.Router()
const passport = require('passport');
require('./passport/googleAuth.js');
const User = require('../DB/MongoDB/index.js');

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
 passport.authenticate('google', { failureRedirect: '/login', failureFlash: true
}),
 function(req, res) {
  //  console.log('reqUser987', req.user);
  // req.session.user = req.user;
   res.redirect('/HomePage');
 });


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
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

module.exports = router;
