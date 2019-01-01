const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const signupuser = require('../../DB/MongoDB/schema/sharik_db__users_schema.js');
const Teacher = require('../../DB/MongoDB/schema/teacherSchema')
const bcrypt = require("bcrypt-nodejs");

passport.use(new LocalStrategy(
  {
    usernameField: 'email' // not necessary, DEFAULT
  },
  function(email, password, done) {
    console.log('356',email, password )
    Teacher.findOne({ 'email': email }, (err, userMatch) => {
      if (err) {
        return done(err)
      }
      if (userMatch) {
        console.log('hi there')
        if (bcrypt.compareSync(password, userMatch.password)) {
          console.log('hello world')
          console.log('sg', bcrypt.compareSync(password, userMatch.password))
          return done(null, userMatch)
        }
        //return done(null,userMatch)
      } else {

        signupuser.findOne({'email': email}, (err, userMatch) => {
          if(err){
            return done(err)
          }
          if(userMatch) {
            if (bcrypt.compareSync(password, userMatch.password)) {
              console.log('hello world')
              console.log('sg', bcrypt.compareSync(password, userMatch.password))
              return done(null, userMatch)
            }else {
              return done(null, false, { message: 'Check you password or email' })
            }
          }

        })

        
      }
      
 
      
    })
  }
));

// Teacher.findOne({ 'email': email }, (err, userMatch) => {
//   if (err) {
//     return done(err)
//   }
//   if (!userMatch) {
//     return done(null, false, { message: 'Incorrect username' })
//   }
//   if (!bcrypt.compareSync(password, userMatch.password)) {
//     console.log('sg', bcrypt.compareSync(password, userMatch.password))
//     return done(null, false, { message: 'Incorrect password' })
//   }
//   return done(null, userMatch)
// })