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
      console.log('kill him',userMatch)
      if (err) {
        console.log('bich')
        return done(err)
      }
      if (userMatch) {
        console.log('hi there')
        if (userMatch.password) {
        if (bcrypt.compareSync(password, userMatch.password)) {
          console.log('hello world')
          console.log('sg', bcrypt.compareSync(password, userMatch.password))
          return done(null, userMatch)
        }
        //return done(null,userMatch)
      } else if (!userMatch.password) { console.log('hi there'); return done(null, userMatch)
      }} else {
               // console.log('hi there')
        signupuser.findOne({'email': email}, (err, userMatch) => {
          if(err){
            // console.log('hi there')
            return done(err)
          }
          if(userMatch) {
            // console.log('hi there')
            if (userMatch.password) {
              if (bcrypt.compareSync(password, userMatch.password)) {
                console.log('hello world')
                console.log('sg', bcrypt.compareSync(password, userMatch.password))
                return done(null, userMatch)
              }
            } else if (!userMatch.password) {return done(null, userMatch)}
            else {
              return done(null, false, { message: 'Check you password or email' })
            }
          }

        })
      }
        
      
 
      
    })
  }
));

