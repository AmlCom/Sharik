const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const signupuser = require('../../DB/MongoDB/schema/sharik_db__users_schema.js');

passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log('asf',username, password);
    }
  ));