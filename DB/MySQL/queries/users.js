var mysql = require('mysql');

var db = require('../connect');

/*
CREATE TABLE IF NOT EXISTS `sharik`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `usernam` VARCHAR(45) NOT NULL,
    `name` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `mobile_phone` INT NULL,
    `password` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `usernam_UNIQUE` (`usernam` ASC),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC));
*/

module.exports = {

    selectAllUsers: function (callback) {

        console.log("Sharik/DB/MySQL/queries/users.js - function - selectAllUsers:")

        var sqlQuery = `SELECT * FROM users`;

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

    createUser: function (req, callback) {

        console.log("Sharik/DB/MySQL/queries/users.js - function - createUser: req.body")
        console.log(req.body);

        var sqlQuery= `INSERT INTO users (\`usernam\`, \`name\`, \`email\`, \`mobile_phone\`, \`password\`) VALUES (?, ?, ?, ?, ?)`;
        var quValue = [req.body.usernam, req.body.name, req.body.emaile, req.body.mobile_phone, req.body.password]

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
            })
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
	
	searchUser: function (req, callback) {
    
		console.log("Sharik/DB/MySQL/queries/users.js - function - searchUser : ")
		var sqlQuery = `SELECT * FROM users WHERE `;
		var quColumn = [];
		var quValue = [];
		var quColumnStr = '';
	
		for (key in req.body) {
		  if (req.body[key]) {
			quColumn.push(key + ' = ?')
			quValue.push(req.body[key])
		  }
		}
	
		quColumnStr = quColumn.join(' && ');
		console.log("sqlQuery: ", sqlQuery);
		console.log("quColumnStr: ", quColumnStr);

		sqlQuery = sqlQuery.concat(quColumnStr);
		console.log("sqlQuery Concat: ", sqlQuery);
		console.log("quColumn", quColumn);
		console.log("quValue", quValue);
	
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