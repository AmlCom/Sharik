var express = require('express');
var bodyParser = require('body-parser');
var Message = require('../DB/MongoDB/schema/messageSchema')
const mongoose = require('mongoose');
const router = express.Router()

mongoose.Promise = global.Promise;


//save the message to the database else update the previous one by
//pushing the new message 

router.post('/message', (req, res, next) => {
    var messageid = req.body.teacherid + req.body.studentid

    console.log('req.body', req.body)


    Message.findOne({ 'messageId': messageid }).then(function (message) {
        console.log('message', message)
        if (!message) {

          var   messageList = [
                {author: "me",
                data: {text: req.body.message},
                type: "text"
                }
                ]

            const message = new Message({
                messageId: messageid,
                messagesTeacherStudent: messageList,
            });

            message.save().then((message) => {
                res.end(message);
            }).catch((err) => {
                console.log(err)
            })

        } else {

            console.log('before', message)
          var obj =   {author: "me",
            data: {text: req.body.message},
            type: "text"
            }
            message.messagesTeacherStudent.push(obj)
            console.log('after', message)


            Message.findOneAndUpdate({ 'messageId': messageid }, { 'messagesTeacherStudent':message.messagesTeacherStudent  }).then(function (message) {
                console.log('updated one',message)
                res.send(message)
            }).catch(next)

        }
    }).catch(next)
})

router.post('/allmessages',(req,res,next) => {

    messageId = req.body.teacherid + req.body.studentid
    Message.findOne({ 'messageId': messageId  }).then((message) =>{
        res.send(message)
    })
    .catch((err) => {
        console.log(err)
    })

})




module.exports = router