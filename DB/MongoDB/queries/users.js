

var db = require('../connect');
var User = require('../schema/sharik_db__users_schema.js');

/*

*/

module.exports = {
	// 1.3 Table User Functions:
	// ------------------------

	// 1.3.1 Create (Save) a user in the DB User table:
	createUser: function (data, callback) {
		this.hashPassword(data["password"], function (hashErr, hashedPassword) {
			if (hashErr) {
				console.log("HashPassword Error: ");
				console.log(hashErr);
				callback(hashErr, null);
			} else {
				let user = new User({
					username: data["username"],
					email: data["email"],
					firstname: data["firstname"],
					password: hashedPassword,
					middlenames: data["middlenames"],
					lastname: data["lastname"],
					phonenumber: data["phonenumber"]
				});

				user.save(function (saveErr) {
					if (saveErr) {
						callback(saveErr, null);
					} else {
						callback(null, user);
					}

				});
			}

		});
	},
	
	// Select all Users:
	selectAllUsers: function (callback) {
		User.find({}, function(selectAllUsersErr, allUsersQueryResulte) {
			if (selectAllUsersErr) {
				callback(selectAllUsersErr, null);
			} else {
				callback(null, allUsersQueryResulte)
			}
		  });
	},
	

	// Delete User:
	deletePark: function (parkId, callback) {
		User.deleteOne({ "_id": ObjectId(parkId) }, (err, res) => {
			if (err) {
				console.log("delete error", err)
			}
			callback(res)
		});
	},


	// ***************************************************************

	// x Helping Funktions:
	// -----------------
	// x.1 Generating hash password using bcrypt (For User Table):

	hashPassword: function (password, callback) {
		bcrypt.genSalt(SALT_WORK_FACTOR, function (bcryptGenSaltErr, salt) {
			if (bcryptGenSaltErr) {
				throw bcryptGenSaltErr;
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
		User.findOne({ email: data.email }, function (errFindOne, resulteDB) {

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
		});
	},


}