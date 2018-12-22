const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId: {
        type: String,
        required: [true, 'Name Field is Required']
    },
    displayName: {
        type: String,
        required: [true, 'Name Field is Required']
    }
});



module.exports = mongoose.model('User', UserSchema);
