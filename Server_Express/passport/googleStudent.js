// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const User = require('./../../DB/MongoDB/index.js');
// const keys = require('../keys.js');
// const signupuser = require('../../DB/MongoDB/schema/sharik_db__users_schema.js');


// // Google strategy ////////////////////////////////////
// passport.use(new GoogleStrategy({
//     clientID: keys.googleStudent.clientID,
//     clientSecret: keys.googleStudent.clientSecret,
//     callbackURL: "/student/redirect"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // console.log(profile);
  
//     signupuser.findOne({ generalId: profile.id }, function (err, user) {
//         if (err) {
//           return done(err);
//         } else if (user) {
//           console.log('Already existy', user);
//            done(null, user);
//         } else {
//           const newUser = new signupuser(); 
//           newUser.generalId = profile.id;
//           newUser.firstname = profile.displayName;
//         //   newUser.imageURL= profile.photos[0].value;
//           newUser.isTeacher = false;
//           newUser.save((err, newuser) => {
//           if (err) {
//             return done(err);
//           }
//           done(null, newuser);
//           });
//         }
//       });
//   }
//   ));

