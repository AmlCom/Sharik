
var db = require('../connect');

var usersTable = require('./users.js');

// var reqArrList = require('./users.data.js');
// var usersData = reqArrList.reqArrList()

var usersData = require('../../fakeData/MOCK_DATA.json');

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

// Create Users:

// console.log('Sharik/DB/MongoDB/queries/users.test.js - usersData: ');
// console.log(usersData);

for (var i = 0; i < usersData.length; i++) {
// for (var i = 0; i < 2; i++) {
	usersTable.createUser(usersData[i],
		function (createUserQueryErr, createUserQueryResult) {

			if (createUserQueryErr) {
				console.log('Sharik/DB/MongoDB/queries/users.js - function - createUser - QueryErr`: ');
				console.log(createUserQueryErr);
			} else {
				console.log('Sharik/DB/MongoDB/queries/users.test.js - function - createUser - QueryResult: ');
				console.log(createUserQueryResult);
			}
		}
	);
}




// // Select All Users:
// usersTable.selectAllUsers(
// 	function (allUsersQueryErr, allUsersQueryResulte) {
// 		if (allUsersQueryErr) {
// 			console.log('Sharik/DB/MongoDB/queries/users.js - function - selectAllUsers - allUsersQueryErr: ');
// 			console.log(allUsersQueryErr);
// 		} else {
// 			console.log('Sharik/DB/MongoDB/queries/users.js - function - selectAllUsers - allUsersQueryResulte: ');
// 			console.log(allUsersQueryResulte);
// 		}
// 	}
// );

