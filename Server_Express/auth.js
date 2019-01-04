const express = require('express')
const router = express.Router()
const passport = require('passport');
require('./passport/googleAuth.js');
require('./passport/facebookAuth.js');
require('./passport/local-strategyAuth.js');
const User = require('../DB/MongoDB/index.js');
const signupuser = require('../DB/MongoDB/schema/sharik_db__users_schema.js');
const Teacher = require('../DB/MongoDB/schema/teacherSchema')
const bcrypt = require("bcrypt-nodejs");


passport.serializeUser(function(user, done) {
  console.log('DSA', user);
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/google',
 passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/redirect', 
 passport.authenticate('google', { failureRedirect: '/singin'
}),
 function(req, res) {
   console.log('errrrrrrrrrrror');
  // req.session.user = req.user;
   res.redirect('/HomePage');
 });


router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect',
  passport.authenticate('facebook', { successRedirect: '/HomePage',
                                      failureRedirect: '/singin' }));


router.post('/signup', (req, res) => {
  signupuser.findOne({ 'email': req.body.email }, (err, userMatch) => {
    if (userMatch) {
      console.log('user already exist: ', userMatch)
      res.end();
    } else {
      console.log('bala',req.body.profession)

      if (req.body.profession === "Teacher"){
        const signupuser1 = new Teacher({
          firstname: req.body.firstName,
          lastname: req.body.lastName,
          email: req.body.email,
          password:  bcrypt.hashSync(req.body.password),
          isTeacher:true
        });
        signupuser1.save().then((user) => {
          // console.log('oii', user);
          // req.session.user = user;
          // console.log('oii', req.session);

          res.end();
        });
      
      } else  {
        const signupuser1 = new signupuser({
          firstname: req.body.firstName,
          lastname: req.body.lastName,
          email: req.body.email,
          password:  bcrypt.hashSync(req.body.password),
          isTeacher:false
        });
        signupuser1.save().then((user) => {
          // console.log('oii', user);
          // req.session.user = user;
          // console.log('oii', req.session);

          res.end();
        });
      }


    };  
  })
})


router.post('/signin',
passport.authenticate('local'),
(req, res) => {
  console.log('hey')
  // console.log('dtrt', req.session)
  res.send(req.session)
}
);

router.get('/checkLogging', (req, res) => {
  if(req.session.passport) {
  console.log('321',req.session)
  Teacher.findOne({firstname: req.session.passport.user.displayName}, (err, user) => {
    // console.log('asd',user)
  if (req.session.passport && user) {
     res.send(user);
  } else {
    signupuser.findOne({firstname: req.session.passport.user.displayName}, (err, user) => {
      console.log('asd',user)
    if (req.session.passport) {
       res.send(user);
    } else {
      res.end();
    }
  })
  }
})
  }
})

router.get('/logout', (req, res, next) => {
  req.session = null;
  res.redirect('/');
});


module.exports = router;