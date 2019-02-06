const express = require('express')
const router = express.Router()
const Teacher = require('../DB/MongoDB/schema/teacherSchema')
const signupuser = require('../DB/MongoDB/schema/sharik_db__users_schema.js');

router.post('/isStudent', (req, res) => {
    console.log('eret', req.body);
    if (req.body.isStudent === 'Teacher') {
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
    } else if (req.body.isStudent === 'Student') {
        signupuser.findOne({ email: req.session.passport.user.email }, function (err, user) {
            if (err) {
                res.send(err);
            } else if (user) {
                console.log('Already existy', user);
                res.end();
            } else {
                const newUser = new signupuser();
                // newUser.generalId = req.session.passport.user.generalId;
                newUser.firstname = req.session.passport.user.firstname;
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


module.exports = router;