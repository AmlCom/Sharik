var usersData = require('../../fakeData/MOCK_DATA.json');

var DB_M_users = require('./DB_MongoDB_users.js');

DB_M_users.selectAllUsers(null, null, function (allUsersQueryErr, allUsersQueryResulte) {
	if (allUsersQueryErr) {
		console.log("--------------------");
		console.log("Server_Express/users/DB_MongoDB_users.test.js - selectAllUsers: allUsersQueryErr");
		console.log("Failed to Select all User!");
		console.log(allUsersQueryErr);
		console.log("--------------------");
		console.log("");
		console.log("");
	} else {
		onsole.log("--------------------");
		console.log("Server_Express/users/DB_MongoDB_users.test.js - selectAllUsers: allUsersQueryErr");
		console.log("Failed to Select all User!");
		console.log(allUsersQueryResulte);
		console.log("--------------------");
		console.log("");
		console.log("");
	}
});

Server_Express/users/DB_MongoDB_users.test.js