
var db = require('../connect');

var usersTable = require('./users.js');


usersTable.selectAllUsers(
	function (allUsersQueryErr, allUsersQueryResulte) {
		if (allUsersQueryErr) {
			console.log('Sharik/DB/MongoDB/queries/users.js - function - selectAllUsers - allUsersQueryErr: ');
			console.log(allUsersQueryErr);
		} else {
			console.log('Sharik/DB/MongoDB/queries/users.js - function - selectAllUsers - allUsersQueryResulte: ');
			console.log(allUsersQueryResulte);
		}
	}
);


// req.body.usernam, req.body.name, req.body.emaile, req.body.mobile_phone, req.body.password
/* 
username: { type: String, required: true },
email: { type: String, required: true },
firstname: String, 
middlenames: String, 
lastname: String,
password: { type: String, required: true },
phonenumber: { type: String, required: true }

*/

var req = {};
req.body = {};

for (var i = 0; i < 10; i++) {
	req.body.username  = "User_" + i.toString();
	req.body.email = "user_" + i.toString() + "@abc.xyz";
	req.body.firstname = "firstname_" + i.toString();
	req.body.middlenames = "middlenames_" + i.toString();
	req.body.lastname = "lastname_" + i.toString();
	req.body.password = "password" + i.toString();
	req.body.phonenumber = Math.floor(Math.random() * 1000000000);;
	
	usersTable.createUser(req,
		function (errObj, createUserQueryResult) {
	
			if (errObj) {
				console.log(createUserQueryErr);
			} else {
				console.log('Sharik/DB/MongoDB/queries/users.js - function - createUser - QueryResult: ');
				console.log(createUserQueryResult);
			}
		}
	);
}






