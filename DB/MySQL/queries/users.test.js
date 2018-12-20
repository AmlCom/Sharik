var mysql = require('mysql');

var db = require('../connect');

var usersTables = require('./users.js');


usersTables.selectAllUsers(
	function (errObj, sqlQueryResult) {
		if (errObj) {
			console.log(errObj);
		} else {
			console.log('Sharik/DB/MySQL/queries/users.js - function - selectAllUsers - sqlQueryResult: ');
			console.log(sqlQueryResult);
		}
	}
);

usersTables.selectAllUsers(
	function (errObj, sqlQueryResult) {
		if (errObj) {
			console.log(errObj);
		} else {
			console.log('Sharik/DB/MySQL/queries/users.js - function - selectAllUsers - sqlQueryResult: ');
			console.log(sqlQueryResult);
		}
	}
);

// req.body.usernam, req.body.name, req.body.emaile, req.body.mobile_phone, req.body.password
var req = {};
req.body = {};
req.body.usernam  = "MustfX";
req.body.name = "Mustf";
req.body.emaile = "mustf@mustf.com";
req.body.mobile_phone = 123321;
req.body.password = "mustf";

usersTables.createUser(req,
	function (errObj, sqlQueryResult) {

		if (errObj) {
			console.log(errObj);
		} else {
			console.log('Sharik/DB/MySQL/queries/users.js - function - selectAllUsers - sqlQueryResult: ');
			console.log(sqlQueryResult);
		}
	}
);




