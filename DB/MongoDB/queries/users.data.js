/* 
user_name: { type: String, required: true },
email: { type: String, required: true },
password: { type: String, required: true },
first_name: String, 
middle_names: String,
last_name: String,
gender:,
phone_number: { type: String, required: true }

user_name: data["user_name"],
email: data["email"],
   : hashedPassword,
first_name: data["first_name"],
middle_names: data["middle_names"],
last_name: data["last_name"],
gender: data["gender"],
phone_number: data["phone_number"]

*/



module.exports = {
	reqArrList: function () {
		var reqArrList = [];
		var req = {};
		req.body = {};

		for (var i = 0; i < 10; i++) {
			req.body.user_name = "User_" + i.toString();
			req.body.email = "user_" + i.toString() + "@abc.xyz";
			req.body.firstname = "firstname_" + i.toString();
			req.body.middlenames = "middlenames_" + i.toString();
			req.body.lastname = "lastname_" + i.toString();
			req.body.password = "password" + i.toString();
			req.body.phonenumber = Math.floor(Math.random() * 1000000000);;

			// To make a copy of the object Not to copy referances we Use:
			// JSON.parse(JSON.stringify(req))
			reqArrList.push(JSON.parse(JSON.stringify(req)))
			// console.log("+++++++++++++++Test req:")
			// console.log(req.body)
		}
		console.log('Sharik/DB/MongoDB/queries/users.data.js - usersData: ');
		console.log(reqArrList);
		return reqArrList;

	}

}