const express = require('express')
const router = express.Router()
const Teacher = require('../DB/MongoDB/schema/teacherSchema')
const signupuser = require('../DB/MongoDB/schema/sharik_db__users_schema.js');

router.post('/addStudent', (req, res) => {
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

  //update profile picture of the student
  router.post('/updateStudentProfile', function (req, res, next) {
    //console.log('yaya is here')
    console.log('yaya is here',req.body)
    console.log('image',req.body.image)
    // Teacher.findOneAndUpdate({'firstname':req.body.name},{'image':req.body.image}).then(function (teacher) {
    //   console.log('teacheer',teacher)
    //   //res.send('hello')
    //   res.send(teacher)
    // }).catch(next)
  });
  
module.exports = router;