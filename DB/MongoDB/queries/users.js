
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
// Read - bcrypt Docs:
// https://www.npmjs.com/package/bcrypt

var db = require('../connect');
var User = require('../schema/sharik_db__users_schema.js');

/*

*/

// ***************************************************************

// Tables:
// ------------------------

// Read - MongooseJS model Docs:
// https://mongoosejs.com/docs/models.html

// Read - MongooseJS model Docs Create / save:
// https://mongoosejs.com/docs/models.html#constructing-documents

// Read - MongooseJS model Docs Query (find, findById, findOne, where):
// https://mongoosejs.com/docs/models.html#querying

// Read - MongooseJS model Docs Query (findOneAndUpdate):
// https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

// Read - MongooseJS model (deleting) Docs:
// https://mongoosejs.com/docs/models.html#deleting

// Read - MongooseJS model (updating) Docs:
// https://mongoosejs.com/docs/models.html#updating

module.exports = {
	// 1.3 Table User Functions:
	// ------------------------

	// 1.3.1 Create (Save) a user in the DB User table:
	createUser: function (data, callback) {
		console.log("DB/MongoDB/queries/users.js - createUser:");
		this.checkUsername(data["user_name"]), function (findOne_user_name_Err, findOne_user_name_Resulte) {

		};
		this.hashPassword(data["password"], function (hashErr, hashedPassword) {
			if (hashErr) {
				console.log("HashPassword Error: ");
				console.log(hashErr);
				callback(hashErr, null);
			} else {
				let user = new User({
					user_name: data["user_name"],
					email: data["email"],
					password: hashedPassword,
					first_name: data["first_name"],
					middle_names: data["middle_names"],
					last_name: data["last_name"],
					gender: data["gender"],
					phone_number: data["phone_number"]
				});

				user.save(function (createUserErr, createUserResult) {
					if (createUserErr) {
						console.log("--------------------");
						console.log("DB/MongoDB/queries/users.js - createUser:  save() - createUserErr");
						console.log("Failed to Created User!");
						console.log(createUserErr);
						console.log("--------------------");
						console.log("");
						console.log("");

						callback(createUserErr, null);
					} else {
						console.log("--------------------");
						console.log("DB/MongoDB/queries/users.js - createUser:  save() - createUserResult");
						console.log("User Created Successfully !");
						console.log(createUserResult);
						console.log("--------------------");
						console.log("");
						console.log("");
						callback(null, createUserResult);
					}

				});
			}

		});
	},

	// Select all Users:
	selectAllUsers: function (callback) {
		User.find({}, function (selectAllUsersErr, allUsersQueryResulte) {
			if (selectAllUsersErr) {
				callback(selectAllUsersErr, null);
			} else {
				callback(null, allUsersQueryResulte)
			}
		});
	},


	// Delete User:
	deleteUser: function (user_id, callback) {
		User.deleteOne({ "_id": ObjectId(user_id) }, (deleteUserErr, deleteUsersQueryResulte) => {
			if (deleteUserErr) {
				console.log("deleteUserErr:");
				console.log(err);
				callback(deleteUserErr, null);
			} else {
				console.log("deleteUsersQueryResulte:");
				console.log(deleteUsersQueryResulte);
				callback(null, deleteUsersQueryResulte)
			}
		});
	},


	// ***************************************************************

	// x Helping Funktions:
	// -----------------
	// x.1 Generating hash password using bcrypt (For User Table):

	hashPassword: function (password, callback) {
		console.log(" +++++ hashPassword Functiobn:")
		console.log(password)
		bcrypt.genSalt(SALT_WORK_FACTOR, function (bcryptGenSaltErr, salt) {
			if (bcryptGenSaltErr) {
				console.log("bcryptGenSaltErr")
				console.log(bcryptGenSaltErr);
				callback(bcryptGenSaltErr, null)
			} else {
				bcrypt.hash(password, salt, function (bcryptErr, hashedPassword) {
					if (bcryptErr) {
						callback(bcryptErr, null);
					} else {
						callback(null, hashedPassword);
					}
				});
			}
		});
	},


	// x.2 Checking login password with database (For User Table):

	checkPassword: function (data, callback) {
		User.findOne({ email: data.email },
			function (errFindOne, resulteDB) {

				if (errFindOne) {
					onsole.log("checkPassword: User.findOne:");
					onsole.log(errFindOne);
					callback(errFindOne, null);
				} else {
					if (resulteDB) {
						bcrypt.compare(
							data.password,
							resulteDB.password,
							function (compareErr, isMatch) {
								if (compareErr) {
									console.log("checkPassword: compareErr");
									console.log(compareErr);
									callback(compareErr, null);
								} else {
									console.log("isMatch", isMatch)
									if (isMatch) {
										callback(null, resulteDB._id);
									} else {
										callback(null, "checkPassword: Wrong Password");
									}
								}
							});
					} else {
						console.log("checkPassword: Wrong email");
						callback(null, "Wrong email");
					}
				}
			}
		);
	},

	checkUsername: function (user_name, callback) {
		console.log("--------------------");
		console.log("DB/MongoDB/queries/users.js - checkUsername:");
		console.log("");
		User.findOne({ user_name: user_name },
			function (findOne_user_name_Err, findOne_user_name_Resulte) {

				if (findOne_user_name_Err) {
					console.log("DB/MongoDB/queries/users.js - checkUsername: findOne_user_name_Err");
					onsole.log(findOne_user_name_Err);
					console.log("");
					callback(findOne_user_name_Err, null);
				} else {
					console.log("DB/MongoDB/queries/users.js - checkUsername: findOne_user_name_Resulte");
					console.log(findOne_user_name_Resulte);
					if (findOne_user_name_Resulte) {

						callback(null, findOne_user_name_Resulte);

					} else {

						callback(null, null);

					}
				}
			}
		);

	},

	checkEmail: function () {

	},




}