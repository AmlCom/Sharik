
var tb_users = require('../../DB/MySQL/queries/users.js');


module.exports = {
	selectAllUsers: function (request, response, callback) {
		
		var sqlQuery = `SELECT * FROM users`;
		
		tb_users.selectAllUsers(sqlQuery, 
			function (errObj, sqlQueryResult) {
				if (err) {
					
					return callback(errObj, null);

				} else {
					
					return callback(null, sqlQueryResult);

				}
			}
		);
	},

	createUser: function (request, response, callback) {
		// 
		var errObj_createUser = {
			// Type : err.
			type: "Server_Express/users/users.js - function - createUser -  Error",
			isErr: false,
			err: {},
			emptyFields: []
		};

		if (!request.body.username) {
			errObj_createUser.isErr = true;
			errObj_createUser.emptyFields.push("username");
		}
		
		if (!request.body.name) {
			errObj_createUser.isErr = true;
			errObj_createUser.emptyFields.push("name");
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
			function (errObj, UserName_exists){
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
			function (errObj, email_exists){
				if (errObj) {
					errObj_createUser.isErr = true;
					errObj_createUser.err = errObj;
				} else if (email_exists) {
					errObj_createUser.isErr = true;
					errObj_createUser.err.email_exists = true
				} 
			}
		);

		if ( errObj_createUser.isErr ) {
			console.log("errObj_createUser.isErr");
			console.log(errObj_createUser);
			return callback(errObj_createUser, null);
		}

		var sqlQuery= `INSERT INTO users (\`username\`, \`name\`, \`email\`, \`mobile_phone\`, \`password\`) VALUES (?, ?, ?, ?, ?)`;
        var quValue = [request.body.username, request.body.name, request.body.email, request.body.mobile_phone, request.body.password];

		tb_users.createUser(sqlQuery, quValue,
			function (errObj, sqlQueryResult) {
				if (errObj) {
					
					return callback(errObj, null);

				} else {
					console.log("tb_users.createUser")
					return callback(null, sqlQueryResult);

				}
			}
		);
	},

	searchUser: function (request, response, callback) {
		var sqlQuery = `SELECT * FROM users WHERE `;
		var quColumn = [];
		var quValue = [];
		var quColumnStr = '';
	
		for (key in request.body) {
		  if (request.body[key]) {
			quColumn.push(key + ' = ?')
			quValue.push(request.body[key])
		  }
		}
	
		quColumnStr = quColumn.join(' && ');
		console.log("sqlQuery: ", sqlQuery);
		console.log("quColumnStr: ", quColumnStr);

		sqlQuery = sqlQuery.concat(quColumnStr);
		console.log("sqlQuery Concat: ", sqlQuery);
		console.log("quColumn", quColumn);
		console.log("quValue", quValue);

		tb_users.searchUser(sqlQuery, quValue,
			function (errObj, sqlQueryResult) {
				if (err) {
					
					return callback(errObj, null);

				} else {
					
					return callback(null, sqlQueryResult);

				}
			}
		);
	},

	checkEmail: function (email, callback) {
		var sqlQuery = `SELECT * FROM users WHERE email = ?`;
		var quValue = email;

		console.log("checkUserName >> tb_users.searchUser (email)")

		
		tb_users.searchUser(sqlQuery, quValue,
			function (errObj, sqlQueryResult) {
				console.log("sqlQueryResult[0].email: ", sqlQueryResult[0].email)
				if (errObj) {
					
					return callback(errObj, null);

				} else {
					if (email === sqlQueryResult[0].email) {
						return callback(null, true);
					} else {
						return callback(null, false);
					}
				}
			}
		);

	},

	checkUserName: function (username, callback) {
		var sqlQuery = `SELECT * FROM users WHERE username = ?`;
		var quValue = username;
		
		console.log("checkUserName >> tb_users.searchUser (username)")

		tb_users.searchUser(sqlQuery, quValue,
			function (errObj, sqlQueryResult) {
				console.log("sqlQueryResult.username: ", sqlQueryResult[0].username)

				if (errObj) {
					
					return callback(errObj, null);

				} else {
					if (username === sqlQueryResult[0].username) {
						return callback(null, true);
					} else {
						return callback(null, false);
					}
				}
			}
		);
	}, 

	checkPassword: function (password, callback) {

	}, 

	hashPassword: function (password, callback) {

	}
}