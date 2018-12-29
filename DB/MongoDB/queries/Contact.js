// ***************************************************************

// ***************************************************************

var db = require("../connect");
var Contact = require("../schema/sharik_db__Contact_schema.js");

/*

*/

// Tables:
// ------------------------

module.exports = {
  // 1.3 Table Contact Functions:
  // ------------------------

  // 1.3.1 Create (Save) a Contact in the DB Contact table:
  createContact: function(data, callback) {
    console.log("DB/MongoDB/queries/Contact.js - createContact:");

    let contact = new Contact({
      title: data["title"],
      email: data["email"],
      message: data["message"]
    });

    contact.save(function(saveErr) {
      if (saveErr) {
        callback(saveErr, null);
      } else {
        callback(null, user);
      }
    });
  },

  // Select all Users:
  selectAllUsers: function(callback) {
    Contact.find({}, function(selectAllContactsErr, allContactsQueryResulte) {
      if (selectAllContactsErr) {
        callback(selectAllContactsErr, null);
      } else {
        callback(null, allContactsQueryResulte);
      }
    });
  },

  // Delete User:
  deleteContact: function(contact_id, callback) {
    Contact.deleteOne(
      { _id: ObjectId(contact_id) },
      (deleteContactErr, deleteContactQueryResulte) => {
        if (deleteContactErr) {
          console.log("deleteContactErr:");
          console.log(deleteContactErr);
          callback(deleteContactErr, null);
        } else {
          console.log("deleteContactQueryResulte:");
          console.log(deleteContactQueryResulte);
          callback(null, deleteContactQueryResulte);
        }
      }
    );
  },

}
