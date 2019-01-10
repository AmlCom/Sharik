const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create profile schema and model for the teacher
const messageSchema = new Schema({
	messageId: {
		type: String,
		required: false
    },
    messagesTeacherStudent: {
        type: Array,
        required: false,
        default:[]
    }


});


var Message = mongoose.model('messages', messageSchema);


module.exports = Message;