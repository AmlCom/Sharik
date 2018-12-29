// ***************************************************************
// Contact Table schema 
// ***************************************************************

var mongoose = require('../connect');

// ***************************************************************

const db = mongoose.connection;


const Schema = mongoose.Schema;


const ObjectId = mongoose.Types.ObjectId;

db.on("error", function (err) {
	console.log("Mongoose DB Connection Error:");
	console.log(err);
});

db.once("open", function () {
	console.log("Mongoose DB Connection - Connected Successfully:");

});


const ContactSchema = new Schema({

	title: {
		type: String,
		required: true
	},


	email: {
		type: String,
		required: true
	},

	message: {
		type: String,
		required: true
	}
});

// 1.2 Model Constructor:
const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;


