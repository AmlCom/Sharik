// ***************************************************************

// ***************************************************************

// var mongoose = require('../connect');

// ***************************************************************

// const db = mongoose.connection;
// Read - MongooseJS Connections Docs:
// https://mongoosejs.com/docs/connections.html
// https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connection

// const Schema = mongoose.Schema;
// Read - MongooseJS Schema Doc:
// https://mongoosejs.com/docs/guide.html

// const ObjectId = mongoose.Types.ObjectId;
// Read - MongooseJS ObjectId Docs:
// https://mongoosejs.com/docs/schematypes.html#objectids

// ***************************************************************

// db.on("error", function (err) {
// 	console.log("Mongoose DB Connection Error:");
// 	console.log(err);
// });

// db.once("open", function () {
// 	console.log("Mongoose DB Connection - Connected Successfully:");

// });


// ***************************************************************

// 1. Table users: (Signup with email)
// 1.1 Tables Schema (Structure)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SignupSchema = new Schema({

	// username: {
	// 	type: String,
	// 	required: true
	// },
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
	// middlenames: String,
	// phonenumber: {
	// 	type: String,
	// 	required: true
	// }
});

// 1.2 Model Constructor:
const User1 = mongoose.model("User1", SignupSchema);

module.exports = User1;

// *** NOT WORKING YET *** Object Moduling:
// module.exports = {
// 	// 1.2 Model Constructor:
// 	User1:  mongoose.model("User1", SignupSchema),
// }

// ***************************************************************
