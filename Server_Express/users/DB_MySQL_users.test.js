
var tb_users = require('./users.js');

var request = {};
var response = {};
request.body = {};

request.body.username = "user1";
request.body.name = "name1";
request.body.email = "email1@email.com";
request.body.password = "password1";
request.body.mobile_phone = "078435421";

tb_users.createUser(request, response, 
	function (errObj, sqlQueryResult) {
		if (errObj) {
			console.log("tb_users.createUser err: ");
			console.log(errObj)
		} else {
			console.log("tb_users.createUser sqlQueryResult: ");
			console.log(sqlQueryResult)
		}
		
		return ;
	}
);



