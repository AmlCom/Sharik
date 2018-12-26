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
    // console.log(profile);
  
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) {
          return done(err);
        } else if (user) {
          console.log('Already existy', user);
           done(null, user);
        } else {
          const newUser = new User(); 
          newUser.googleId = profile.id;
          newUser.displayName = profile.displayName;
          newUser.imageURL= profile.photos[0].value;
          newUser.save((err, newuser) => {
          if (err) {
            return done(err);
          }
          done(null, newuser);
          });
        }
      });
  }
  ));

