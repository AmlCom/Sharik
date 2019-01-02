// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const User = require('./../../DB/MongoDB/index.js');
// const keys = require('../keys.js');


// // Google strategy ////////////////////////////////////
// passport.use(new GoogleStrategy({
//     clientID: keys.googleStudent.clientID,
//     clientSecret: keys.googleStudent.clientSecret,
//     callbackURL: "/student/redirect"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // console.log(profile);
  
//       User.findOne({ generalId: profile.id }, function (err, user) {
//         if (err) {
//           return done(err);
//         } else if (user) {
//           console.log('Already existy', user);
//            done(null, user);
//         } else {
//             done(null, user);
//         }
//       });
//   }
//   ));

