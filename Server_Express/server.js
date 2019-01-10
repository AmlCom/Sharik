const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const keys = require('./keys.js');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const auth = require('./auth.js')
const studentRoute = require('./studentRoute.js')
require("dotenv").config();
var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var faker = require("faker");
const teacher = require('./teacherRoute')
const messageRoute = require('./messageRoute')



app = express()
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
// app.use('/student', studentRoute)
app.use('/get', teacher)
app.use('/student', studentRoute)

//message route
app.use('/message',messageRoute)


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

//video call function

app.get("/token", function (request, response) {
    var identity = faker.name.findName();

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created

    var token = new AccessToken(
        keys.video.TWILIO_ACCOUNT_SID,
        keys.video.TWILIO_API_KEY,
        keys.video.TWILIO_API_SECRET
    );

    // Assign the generated identity to the token
    token.identity = identity;

    //grant the access token Twilio Video capabilities
    var grant = new VideoGrant();
    // grant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response
    response.send({
        identity: identity,
        token: token.toJwt()
    });
});


// create contact message 
var SerEx_DB_MongoDB_Contacts = require('./Contacts/SerEx_DB_MongoDB_Contacts.js')
app.post('/S_Contact', function (req, res) {
    console.log(req.body)
    SerEx_DB_MongoDB_Contacts.createContact(req, res, function (saveContactErr, saveContactResult) {
        if (saveContactErr) {
            console.log('err', saveContactErr)
            res.end(JSON.stringify(saveContactErr))
        }
        console.log('save result', saveContactResult);
        res.end(JSON.stringify(saveContactResult));
    });

});


var SerEx_DB_MongoDB_Students = require('./Students/SerEx_DB_MongoDB_Students.js')

// Student - Get One Student Info:
app.post('/S_Get_Student_Info', function (request, response) {
    console.log('<<<<<<<<<<<<<<<<');
    console.log('Data:');
    console.log('@ >> Sharik/Server_Express/server.js');
    console.log('@ >> app.post(\'/S_Get_Student_Info\', ...');
    console.log('Request Data msg:');
    console.log(request.body)
    console.log('>>>>>>>>>>>>>>>>');

    SerEx_DB_MongoDB_Students.selectOneStudent(request, response, function (selectOneStudentQueryErr, selectOneStudentsQueryResulte) {
        if (selectOneStudentQueryErr) {
            console.log('<<<<<<<<<<<<<<<<');
            console.log('Error:');
            console.log('@ >> Sharik/Server_Express/server.js');
            console.log('@ >> app.post(\'/S_Get_Student_Info\', ...');
            console.log('@ >> SerEx_DB_MongoDB_Students.selectOneStudent');
            console.log('selectOneStudent Error msg:');
            console.log(selectOneStudentQueryErr)
            console.log('>>>>>>>>>>>>>>>>');

            response.end(JSON.stringify(selectOneStudentQueryErr))
        }

        console.log('<<<<<<<<<<<<<<<<');
        console.log('Data:');
        console.log('@ >> Sharik/Server_Express/server.js');
        console.log('@ >> app.post(\'/S_Get_Student_Info\', ...');
        console.log('@ >> SerEx_DB_MongoDB_Students.selectOneStudent');
        console.log('selectOneStudent Data msg:');
        console.log(selectOneStudentsQueryResulte)
        console.log('>>>>>>>>>>>>>>>>');
        response.end(JSON.stringify(selectOneStudentsQueryResulte));
    });

});


// Student - Set (Update) One Student Info:
app.post('/S_Set_Student_Info', function (request, response) {
    console.log('<<<<<<<<<<<<<<<<');
    console.log('Data:');
    console.log('@ >> Sharik/Server_Express/server.js');
    console.log('@ >> app.post(\'/S_Get_Student_Info\', ...');
    console.log('Request Data msg:');
    console.log(request.body)
    console.log('>>>>>>>>>>>>>>>>');

    SerEx_DB_MongoDB_Students.updateOneStudent(request, response, function (updateOneStudentQueryErr, updateOneStudentsQueryResulte) {
        if (updateOneStudentQueryErr) {
            console.log('<<<<<<<<<<<<<<<<');
            console.log('Error:');
            console.log('@ >> Sharik/Server_Express/server.js');
            console.log('@ >> app.post(\'/S_Get_Student_Info\', ...');
            console.log('@ >> SerEx_DB_MongoDB_Students.updateOneStudent');
            console.log('updateOneStudent Error msg:');
            console.log(updateOneStudentQueryErr)
            console.log('>>>>>>>>>>>>>>>>');

            response.end(JSON.stringify(updateOneStudentQueryErr))
        }

        console.log('<<<<<<<<<<<<<<<<');
        console.log('Data:');
        console.log('@ >> Sharik/Server_Express/server.js');
        console.log('@ >> app.post(\'/S_Get_Student_Info\', ...');
        console.log('@ >> SerEx_DB_MongoDB_Students.updateOneStudent');
        console.log('updateOneStudent Data msg:');
        console.log(updateOneStudentsQueryResulte)
        console.log('>>>>>>>>>>>>>>>>');
        response.end(JSON.stringify(updateOneStudentsQueryResulte));
    });
});


 if (process.env.NODE_ENV === 'production') {
// // Serve any static files
app.use(express.static(path.join(__dirname, '../react-client/build')));
// // Handle React routing, return all requests to React app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../react-client/build', 'index.html'));
});
}


app.listen(port, () => console.log(`Listening on port ${port}`));
