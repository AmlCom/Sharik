
var qu_tb_Contacts = require('../../DB/MongoDB/queries/Qu_Contact.js');


module.exports = {
	selectAllContacts: function (request, response, callback) {

		qu_tb_Contacts.selectAllContacts(
			function (selectAllContactsErr, allContactsQueryResulte) {
				if (selectAllContactsErr) {

					return callback(selectAllContactsErr, null);

				} else {

					return callback(null, allContactsQueryResulte);

				}
			}
		);
	},

	createContact: function (request, response, callback) {
		// 
		var errObj_createContact = {
			// Type : err.
			type: "Server_Express/users/DB_MongoDB_contacts.js - function - createContact -  Error",
			isErr: false,
			err: {},
			emptyFields: []
		};

		if (!request.body.title) {
			errObj_createContact.isErr = true;
			errObj_createContact.emptyFields.push("title");
		}

		if (!request.body.email) {
			errObj_createContact.isErr = true;
			errObj_createContact.emptyFields.push("email");
		}

		if (!request.body.message) {
			errObj_createUser.isErr = true;
			errObj_createUser.emptyFields.push("message");
		}


		if (errObj_createContact.isErr) {
			console.log("errObj_createContact.isErr");
			console.log(errObj_createContact);
			return callback(errObj_createContact, null);
		} else {
			qu_tb_Contacts.createContact(request.body,
				function (saveContactErr, saveContactResult) {
					if (saveContactErr) {
						callback(saveContactErr, null);
					} else {
						callback(null, saveContactResult);
					}

				}
			);
		}
	},

}