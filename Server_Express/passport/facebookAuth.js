const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../DB/MongoDB/index.js');
const keys = require('../keys.js');

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "/auth/facebook/redirect",
    profileFields: ['id', 'name', 'displayName', 'photos']
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({ generalId: profile.id }, function (err, user) {
        if (err) {
          return done(err);
        } else if (user) {
          console.log('Already existy', user);
           done(null, user);
        } else {
          const newUser = new User(); 
          newUser.generalId = profile.id;
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