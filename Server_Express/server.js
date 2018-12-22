const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const User1 = require('../DB/MongoDB/index.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys.js');


const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookie] 
}))
passport.serializeUser(function(user, done) {
  // console.log(user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User1.findById(id, function(err, user) {
    console.log('asdsad', user);
    done(err, user);
  });
});


//database connection
mongoose.connect(keys.mongodb.dbURI)
mongoose.Promise = global.Promise;


var db = mongoose.connection;
db.on('error', function () {
  // console.log('mongoose connection error');
});

db.once('open', function () {
  // console.log('mongoose connected successfully');
});

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  // console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../react-client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../react-client/build', 'index.html'));
  });
 }

 passport.use(new GoogleStrategy({
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: "/auth/google/redirect"
},
function(accessToken, refreshToken, profile, done) {
  // console.log('worked');
  // console.log(profile);

     User1.findOne({ googleId: profile.id }, function (err, user) {
      if (err) {
        return done(err);
      } else if (user) {
        // console.log('Already existy', user);
         done(null, user);
      } else {
        const newUser = new User1(); 
        newUser.googleId = profile.id;
        newUser.displayName = profile.displayName;
        newUser.save((err, newuser) => {
      if (err) {
        return done(err);
      }
      // console.log(newuser);
       done(null, newuser);
    });
      }
      //  return done(err, user);
     });
}
));



app.get('/', (req, res) => {
  res.send('not Actually');
})

 app.get('/auth/google',
 passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }));


app.get('/auth/google/redirect', 
 passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login', failureFlash: true
}),
 function(req, res) {
  //  console.log('reqUser987', req.user);
  // req.session.user = req.user;
   res.redirect('/profile');
 });

const check = function(req, res, next) {
  console.log('123', req.session);
  if(!req.session.passport){
       
    res.redirect('http://localhost:3000/login')
  } else {
    next();
  }
}

app.get('/profile', check, function(req, res) {
  console.log('223', req.session);
  res.send('Nice');
})
app.get('/logout', (req, res, next) => {
  console.log("before", req.session)
  req.session = null;
  res.redirect('/');

  console.log("after", req.session)
});

app.listen(port, () => console.log(`Listening on port ${port}`));