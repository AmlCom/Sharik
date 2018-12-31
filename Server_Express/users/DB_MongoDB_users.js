
var tb_users = require('../../DB/MongoDB/queries/users.js');


module.exports = {
	selectAllUsers: function (request, response, callback) {

		tb_users.selectAllUsers(
			function (allUsersQueryErr, allUsersQueryResulte) {
				if (allUsersQueryErr) {

					return callback(allUsersQueryErr, null);

				} else {

					return callback(null, allUsersQueryResulte);

				}
			}
		);
	},

	createUser: function (request, response, callback) {
		// 
		var errObj_createUser = {
			// Type : err.
			type: "Server_Express/users/DB_MongoDB_users.js - function - createUser -  Error",
			isErr: false,
			err: {},
			emptyFields: []
		};

		if (!request.body.username) {
			errObj_createUser.isErr = true;
			errObj_createUser.emptyFields.push("username");
		}

		if (!request.body.firstname) {
			errObj_createUser.isErr = true;
			errObj_createUser.emptyFields.push("firstname");
		}

		// if (!request.body.middlenames) {
		// 	errObj_createUser.isErr = true;
		// 	errObj_createUser.emptyFields.push("middlenames");
		// }

		if (!request.body.lastname) {
			errObj_createUser.isErr = true;
			errObj_createUser.emptyFields.push("lastname");
		}

		if (!request.body.email) {
			errObj_createUser.isErr = true;
			errObj_createUser.emptyFields.push("email");
		}

		if (!request.body.password) {
			errObj_createUser.isErr = true;
			errObj_createUser.emptyFields.push("password");
		}

		this.checkUserName(request.body.username,
			function (errObj, UserName_exists) {
				if (errObj) {
					errObj_createUser.isErr = true;
					errObj_createUser.err = errObj;
				} else if (UserName_exists) {
					errObj_createUser.isErr = true;
					errObj_createUser.err.UserName_exists = true
				}
			}
		);

		this.checkEmail(request.body.email,
			function (errObj, email_exists) {
				if (errObj) {
					errObj_createUser.isErr = true;
					errObj_createUser.err = errObj;
				} else if (email_exists) {
					errObj_createUser.isErr = true;
					errObj_createUser.err.email_exists = true
				}
			}
		);

		if (errObj_createUser.isErr) {
			console.log("errObj_createUser.isErr");
			console.log(errObj_createUser);
			return callback(errObj_createUser, null);
		} else {
			tb_users.createUser(request.body,
				function (createUserErr, createUserResult) {
					if (createUserErr) {
						callback(createUserErr, null);
					} else {
						callback(null, createUserErr);
					}

				}
			);
		}
	},

	searchUser: function (request, response, callback) {
		// var sqlQuery = `SELECT * FROM users WHERE `;
		// var quColumn = [];
		// var quValue = [];
		// var quColumnStr = '';

		// for (key in request.body) {
		// 	if (request.body[key]) {
		// 		quColumn.push(key + ' = ?')
		// 		quValue.push(request.body[key])
		// 	}
		// }

		// quColumnStr = quColumn.join(' && ');
		// console.log("sqlQuery: ", sqlQuery);
		// console.log("quColumnStr: ", quColumnStr);

		// sqlQuery = sqlQuery.concat(quColumnStr);
		// console.log("sqlQuery Concat: ", sqlQuery);
		// console.log("quColumn", quColumn);
		// console.log("quValue", quValue);

		// tb_users.searchUser(sqlQuery, quValue,
		// 	function (errObj, sqlQueryResult) {
		// 		if (err) {

		// 			return callback(errObj, null);

		// 		} else {

		// 			return callback(null, sqlQueryResult);

		// 		}
		// 	}
		// );
	},

	checkEmail: function (email, callback) {
		
		// console.log("checkUserName >> tb_users.searchUser (email)")


		// tb_users.searchUser(sqlQuery, quValue,
		// 	function (errObj, sqlQueryResult) {
		// 		console.log("sqlQueryResult[0].email: ", sqlQueryResult[0].email)
		// 		if (errObj) {

		// 			return callback(errObj, null);

		// 		} else {
		// 			if (email === sqlQueryResult[0].email) {
		// 				return callback(null, true);
		// 			} else {
		// 				return callback(null, false);
		// 			}
		// 		}
		// 	}
		// );

	},

	checkUserName: function (username, callback) {
		// var sqlQuery = `SELECT * FROM users WHERE username = ?`;
		// var quValue = username;

		// console.log("checkUserName >> tb_users.searchUser (username)")

		// tb_users.searchUser(sqlQuery, quValue,
		// 	function (errObj, sqlQueryResult) {
		// 		console.log("sqlQueryResult.username: ", sqlQueryResult[0].username)

		// 		if (errObj) {

		// 			return callback(errObj, null);

		// 		} else {
		// 			if (username === sqlQueryResult[0].username) {
		// 				return callback(null, true);
		// 			} else {
		// 				return callback(null, false);
		// 			}
		// 		}
		// 	}
		// );
	},

	checkPassword: function (password, callback) {

	},

	hashPassword: function (password, callback) {

	}
}