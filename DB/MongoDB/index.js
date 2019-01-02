const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    generalId: {
        type: String,
        required: [true, 'generalId Field is Required']
    },
    displayName: {
        type: String,
        required: [true, 'Name Field is Required']
    },
    imageURL:  {
        type: String,
        required: [true, 'imageURL Field is Required']
    },
    isTeacher:{
		type: Boolean,
		required: true
	}
});



module.exports = mongoose.model('User', UserSchema);
