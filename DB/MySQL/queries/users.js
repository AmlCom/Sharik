var mysql = require('mysql');

var db = require('../connect');

/*
CREATE TABLE IF NOT EXISTS `sharik_db`.`users` (
	  `id` INT(11) NOT NULL AUTO_INCREMENT,
	  `username` VARCHAR(45) NOT NULL,
	  `name` VARCHAR(45) NOT NULL,
	  `email` VARCHAR(100) NOT NULL,
	  `mobile_phone` INT(11) NULL DEFAULT NULL,
	  `password` VARCHAR(200) NOT NULL,
	  PRIMARY KEY (`id`),
	  UNIQUE INDEX `usernam_UNIQUE` (`username` ASC) ,
	  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
	  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
	DEFAULT CHARACTER SET = utf8
	COLLATE = utf8_bin;
*/

module.exports = {

    selectAllUsers: function (sqlQuery, callback) {

        console.log("Sharik/DB/MySQL/queries/users.js - function - selectAllUsers:")


        db.query(sqlQuery,
            function (err, sqlQueryResult) {
                if (err) {
                    var errObj = {
                        // Type : Query err.
                        type: "Sharik/DB/MySQL/queries/users.js - function - selectAllUsers - Query (SELECT * FROM users) Error",
                        err: err,
                    };

                    console.log(errObj);

                    callback(errObj, null);

                } else {
                    console.log('Sharik/DB/MySQL/queries/users.js - function - selectAllUsers - sqlQueryResult: ');
                    console.log(sqlQueryResult);
                    callback(null, sqlQueryResult);
                }
            }
        )
    },

    createUser: function (sqlQuery, quValue, callback) {

		console.log("Sharik/DB/MySQL/queries/users.js - function - createUser: req.sqlQuery, quValue");
		console.log(sqlQuery, quValue);

        db.query(sqlQuery, quValue,
            function (err, sqlQueryResult) {
                if (err) {

                    var errObj = {
                        // Type : Query err.
                        type: 'Sharik/DB/MySQL/queries/users.js - function - createUser: Query (INSERT INTO users) Error',
                        err: err,
                    };

                    console.log(errObj);

                    callback(errObj, null);
                } else {

                    console.log('Sharik/DB/MySQL/queries/users.js - function - createUser - sqlQueryResult: ');
                    console.log(sqlQueryResult);

                    callback(null, sqlQueryResult);
                }
			}
		);
    },

    // Delete Admin by ID: 
    deleteUser: function (id, callback) {

        console.log("Sharik/DB/MySQL/queries/users.js - function - deleteUser: by id")
        var sqlQuery = `DELETE FROM admin WHERE id = ?`;
        var quValue = id;
        
        db.query(sqlQuery, id,
            function (err, sqlQueryResult) {
                if (err) {
                    var errObj = {
                        // Type : Query err.
                        type: 'Sharik/DB/MySQL/queries/users.js - function - deleteUser : Query (DELETE FROM admin WHERE id = ) Error',
                        err: err,
                    };

                    console.log(errObj);

                    callback(errObj, null);
                } else {

                    console.log('Sharik/DB/MySQL/queries/users.js - function - deleteUser - sqlQueryResult: ');
                    console.log(sqlQueryResult);
                    callback(null, sqlQueryResult)
                }
            })

	},
	
	searchUser: function (sqlQuery, quValue, callback) {
    
		console.log("Sharik/DB/MySQL/queries/users.js - function - searchUser : ")
	
		db.query(sqlQuery, quValue,
		  function (err, sqlQueryResult) {
			if (err) {
				var errObj = {
					// Type : Query err.
					type: 'Sharik/DB/MySQL/queries/users.js - function - searchUser : Query (SELECT * FROM users WHERE  ) Error',
					err: err,
				};

				console.log(errObj);

				callback(errObj, null);
			} else {
			  console.log('Sharik/DB/MySQL/queries/users.js - function - searchUser : Query (SELECT * FROM users WHERE  ) sqlQueryResult');
			  console.log(sqlQueryResult);
			  callback(null, sqlQueryResult)
			}
		  })
	
	  },

}