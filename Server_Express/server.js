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
const User = require('../DB/MongoDB/index.js');
const Teacher = require('../DB/MongoDB/schema/teacherSchema')
const signupuser = require('../DB/MongoDB/schema/sharik_db__users_schema.js');
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

app.get('/studentList', (req, res) => {
    console.log('3654', req.session);
    Teacher.findOne({ email: req.session.passport.user.email }, (err, teacher) => {
        if (err) {
            res.send(err);
        } else {
            signupuser.find({ _id: { $in: teacher.User1 } }, (err, studentsList) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(studentsList)
                }
            })
        }
    })
})

app.post('/isStudent', (req, res) => {
    // console.log('eret', req.body);
    if (req.body.isStudent === 'true') {
        Teacher.findOne({ email: req.session.passport.user.email }, function (err, user) {
            if (err) {
                res.send(err);
            } else if (user) {
                console.log('Already existy', user);
                res.end();
            } else {
                const newUser = new Teacher();
                newUser.firstname = req.session.passport.user.firstname;
                newUser.email = req.session.passport.user.email;
                newUser.imageURL = req.session.passport.user.imageURL;
                newUser.isTeacher = true;
                newUser.save((err, newuser) => {
                    if (err) {
                        console.log('error', err);
                        res.end();
                    } else {
                        res.end();
                    }
                })
            }
        })
    } else if (req.body.isStudent === 'false') {
        signupuser.findOne({ email: req.session.passport.user.email }, function (err, user) {
            if (err) {
                res.send(err);
            } else if (user) {
                console.log('Already existy', user);
                res.end();
            } else {
                const newUser = new signupuser();
                // newUser.generalId = req.session.passport.user.generalId;
                newUser.firstname = req.session.passport.user.displayName;
                newUser.email = req.session.passport.user.email;
                newUser.imageURL = req.session.passport.user.imageURL;
                newUser.isTeacher = false;
                newUser.save((err, newuser) => {
                    if (err) {
                        return res.end();
                    } else {
                        res.end();
                    }
                })
            }
        })
    } else {
        res.end();
    }
})
app.post('/addStudent', (req, res) => {
    console.log('543', req.body);
    Teacher.findOne({ email: req.body.teacherEmail }, (err, user) => {
        if (err) {
            res.send(err);
        } else if (user) {
            let isThere = false;
            for (var i = 0; i < user.User1.length; i++) {
                if (String(user.User1[i]) === req.body.student_id) {
                    isThere = true;
                }
            }
            if (isThere) {
                res.end('you already requested');
            } else {
                let original = user.User1;
                original.push(req.body.student_id);
                Teacher.findOneAndUpdate({ email: req.body.teacherEmail }, { User1: original }, () => {
                    res.send('your request was successful')
                })
            }
        }
    })
})

app.post('/reject', (req, res) => {
    Teacher.findOne({ _id: req.session.passport.user._id }, (err, teacher) => {
        let students = teacher.User1;
        for (var i = 0; i < students.length; i++) {
            if (req.body.studentId === String(students[i])) {
                students.splice(i, 1);
            }
        }
        Teacher.findOneAndUpdate({ _id: req.session.passport.user._id }, { User1: students }, (err, user) => {
            // res.send(user);
        })
    })
    signupuser.findOne({ _id: req.body.studentId }, (err, student) => {
        let studentMessage = student.messages;
        studentMessage.push(`${req.session.passport.user.firstname} has refused your request`);
        signupuser.findOneAndUpdate({ _id: req.body.studentId }, { messages: studentMessage }, (err, user) => {
            res.send('finally');
        })
    })
})

app.post('/accept', (req, res) => {
    Teacher.findOne({ _id: req.session.passport.user._id }, (err, teacher) => {
        let students = teacher.User1;
        for (var i = 0; i < students.length; i++) {
            if (req.body.studentId === String(students[i])) {
                students.splice(i, 1);
            }
        }
        Teacher.findOneAndUpdate({ _id: req.session.passport.user._id }, { User1: students }, (err, user) => {
            // res.send(user);
        })
    })
    signupuser.findOne({ _id: req.body.studentId }, (err, student) => {
        let studentMessage = student.messages;
        studentMessage.push(`${req.session.passport.user.firstname} has accepted your request`);
        signupuser.findOneAndUpdate({ _id: req.body.studentId }, { messages: studentMessage }, (err, user) => {
            res.send('finally');
        })
    })
})

// Student :

var SerEx_DB_MongoDB_Students = require('./Students/SerEx_DB_MongoDB_Students.js')

// Student - Get One Student Info:
app.post('/S_Get_Student_Info', function (request, response) {
 

    SerEx_DB_MongoDB_Students.selectOneStudent(request, response, function (selectOneStudentQueryErr, selectOneStudentsQueryResulte) {
        if (selectOneStudentQueryErr) {
            response.end(JSON.stringify(selectOneStudentQueryErr))
        }
        response.end(JSON.stringify(selectOneStudentsQueryResulte));
    });

});


// Student - Set (Update) One Student Info:
app.post('/S_Set_Student_Info', function (request, response) {
    SerEx_DB_MongoDB_Students.updateOneStudent(request, response, function (updateOneStudentQueryErr, updateOneStudentsQueryResulte) {
        if (updateOneStudentQueryErr) {
            response.end(JSON.stringify(updateOneStudentQueryErr))
        }
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
