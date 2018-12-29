const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const keys = require('./keys.js');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const auth = require('./auth.js')

const app = express();
const port = process.env.PORT || 5000;


app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookie] 
}))
app.use('/auth', auth)



//database connection
mongoose.connect(keys.mongodb.dbURI)
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
})

// create contact message 
var SerEx_DB_MongoDB_Contacts = require('./Contacts/SerEx_DB_MongoDB_Contacts.js')
app.post('/S_Contact',function(req, res){
  console.log(req.body)
  SerEx_DB_MongoDB_Contacts.createContact(req, res,function(saveContactErr, saveContactResult){
    if(saveContactErr){
      console.log('err', saveContactErr)
      res.end(JSON.stringify(saveContactErr))
    }
    console.log('save result', saveContactResult);
    res.end(JSON.stringify(saveContactResult));
  });

});

// if (process.env.NODE_ENV === 'production') {
  // // Serve any static files
  app.use(express.static(path.join(__dirname, '../react-client/build')));
  // // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../react-client/build', 'index.html'));
  });
//  }

app.listen(port, () => console.log(`Listening on port ${port}`));