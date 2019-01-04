const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./../../DB/MongoDB/index.js');
const keys = require('../keys.js');


// Google strategy ////////////////////////////////////
passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('vdsfgfhg', profile);
  
      User.findOne({ generalId: profile.id }, function (err, user) {
        if (err) {
          return done(err);
        } else if (user) {
          console.log('Already existy', user);
           done(null, user);
        } else {
          // const newUser = new User(); 
          // newUser.generalId = profile.id;
          // newUser.displayName = profile.displayName;
          // newUser.imageURL= profile.photos[0].value;
          // newUser.isTeacher = true;
          // newUser.save((err, newuser) => {
          // if (err) {
          //   return done(err);
          // }
          done(null, { generalId : profile.id,
          displayName : profile.displayName,
          imageURL: profile.photos[0].value,});
          // });
        }
      });
  }
  ));

