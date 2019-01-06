const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../DB/MongoDB/index.js');
const keys = require('../keys.js');

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "/auth/facebook/redirect",
    profileFields: ['id', 'name', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('456', profile);
    done(null, { generalId : profile.id,
          displayName : profile.displayName,
          email: profile.emails[0].value,
          imageURL: profile.photos[0].value});
          // });
        }
      // });
  // }
  ));
