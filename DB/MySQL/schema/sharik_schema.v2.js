
var mysql = require('mysql');

var db = require('../connect');

// Creating Database 'sharik_db':
var sqlQueryCreateDB = "CREATE SCHEMA IF NOT EXISTS `sharik_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin";

db.query(sqlQueryCreateDB,
	function (err, sqlQueryResult) {
		if (err) {
			var errObj = {
				// Type : Query err.
				type: "sqlQueryCreateDB:",
				err: err,
			};

			console.log(errObj);

		} else {
			console.log("sqlQueryCreateDB:");
			console.log(sqlQueryResult);
		}
	}
)


// Select Database 'sharik_db' to use for creating tables:
var sqlQueryUseDB = "USE sharik_db";

db.query(sqlQueryUseDB,
	function (err, sqlQueryResult) {
		if (err) {
			var errObj = {
				// Type : Query err.
				type: "sqlQueryUseDB:",
				err: err,
			};

			console.log(errObj);

		} else {
			console.log("sqlQueryUseDB:");
			console.log(sqlQueryResult);
		}
	}
)


// Crating table 'users' 
var sqlQueryCreateTable_users = "" +
	"CREATE TABLE IF NOT EXISTS `sharik_db`.`users` " +
		"(" +
			"`id` INT NOT NULL AUTO_INCREMENT," +
			"`usernam` VARCHAR(45) NOT NULL," +
			"`name` VARCHAR(45) NULL," +
			"`email` VARCHAR(100) NOT NULL," +
			"`mobile_phone` INT NULL," +
			"`password` VARCHAR(200) NOT NULL," +
			"PRIMARY KEY (`id`)," +
			"UNIQUE INDEX `usernam_UNIQUE` (`usernam` ASC)," +
			"UNIQUE INDEX `id_UNIQUE` (`id` ASC)" +
			"UNIQUE INDEX `email_UNIQUE` (`email` ASC) " +
		")" +
		"DEFAULT CHARACTER SET = utf8" +
		"COLLATE = utf8_bin";

db.query(sqlQueryCreateTable_users,
	function (err, sqlQueryResult) {
		if (err) {
			var errObj = {
				// Type : Query err.
				type: "sqlQueryCreateTable_users:",
				err: err,
			};

			console.log(errObj);

		} else {
			console.log("sqlQueryCreateTable_users:");
			console.log(sqlQueryResult);
		}
	}
)

/*

// Crating table 'service' 
var sqlQueryCreateTable_service = "" +
	"CREATE TABLE IF NOT EXISTS `sharik_db`.`service` "+
		"(" +
			"`id` INT NOT NULL AUTO_INCREMENT," +
			"`user_id` INT NOT NULL," +
			"`name` VARCHAR(45) NOT NULL," +
			"`description` TEXT NULL," +
			"`time_start` DATETIME NULL," +
			"`time_end` DATETIME NULL," +
			"`place_pick` VARCHAR(100) NULL," +
			"`place_drop` VARCHAR(100) NULL," +
			"PRIMARY KEY (`id`)," +
			"UNIQUE INDEX `id_UNIQUE` (`id` ASC)" +
			"CONSTRAINT `fk_service_users`" +
				"FOREIGN KEY (`users_id`)" +
				"REFERENCES `sharik_db`.`users` (`id`)" +
				"ON DELETE NO ACTION" +
				"ON UPDATE NO ACTION" +
		")" +
		"DEFAULT CHARACTER SET = utf8" +
		"COLLATE = utf8_bin;";

db.query(sqlQueryCreateTable_service,
	function (err, sqlQueryResult) {
		if (err) {
			var errObj = {
				// Type : Query err.
				type: "sqlQueryCreateTable_service:",
				err: err,
			};

			console.log(errObj);

		} else {
			console.log("sqlQueryCreateTable_service:");
			console.log(sqlQueryResult);
		}
	}
)

// Inserting Fake data to table 'users':
// ------------------------------------

var sqlQueryInsertTable_service1 = "INSERT INTO `sharik_db`.`service`(`user_id`, `name`, `description`, `place_pick`, `place_drop`) " +
	"VALUES('2', 'car', 'car form to amman to zarqa', 'https://goo.gl/maps/jfqGprEEaPA2', 'https://www.google.com/maps/@32.0625536,36.0942746,20.99z');"

db.query(sqlQueryInsertTable_service1,
	function (err, sqlQueryResult) {
		if (err) {
			var errObj = {
				// Type : Query err.
				type: "sqlQueryInsertTable_service1:",
				err: err,
			};

			console.log(errObj);

		} else {
			console.log("sqlQueryInsertTable_service1:");
			console.log(sqlQueryResult);
		}
	}
)

var sqlQueryInsertTable_service2 = "INSERT INTO `sharik_db`.`service`(`user_id`, `name`, `description`, `place_pick`) " +
	"VALUES('1', 'room', 'room for two days', 'https://goo.gl/maps/Rhzqd8hqpGu')";

db.query(sqlQueryInsertTable_service2,
	function (err, sqlQueryResult) {
		if (err) {
			var errObj = {
				// Type : Query err.
				type: "sqlQueryInsertTable_service2:",
				err: err,
			};

			console.log(errObj);

		} else {
			console.log("sqlQueryInsertTable_service2:");
			console.log(sqlQueryResult);
		}
	}
)

var sqlQueryAlterJoinTable_service_users3 = "ALTER TABLE `sharik_db`.`service` ADD CONSTRAINT`service_fk0` FOREIGN KEY(`user_id`) REFERENCES `sharik_db`.`users`(`id`)";

db.query(sqlQueryAlterJoinTable_service_users3,
	function (err, sqlQueryResult) {
		if (err) {
			var errObj = {
				// Type : Query err.
				type: "sqlQueryAlterJoinTable_service_users3:",
				err: err,
			};

			console.log(errObj);

		} else {
			console.log("sqlQueryAlterJoinTable_service_users3:");
			console.log(sqlQueryResult);
		}
	}
)


// Inserting Fake data to table 'users':
// ------------------------------------

var sqlQueryInsertTable_users1 = "INSERT INTO `sharik_db`.`users` (`usernam`, `name`, `email`, `mobile_phone`, `password`) " +
	"VALUES ('aa', 'a a', 'aa@a.com', '0788967341', '111')";

db.query(sqlQueryInsertTable_users1,
	function (err, sqlQueryResult) {
		if (err) {
			var errObj = {
				// Type : Query err.
				type: "sqlQueryInsertTable_users1:",
				err: err,
			};

			console.log(errObj);

		} else {
			console.log("sqlQueryInsertTable_users1:");
			console.log(sqlQueryResult);
		}
	}
)

var sqlQueryInsertTable_users2 = "INSERT INTO `sharik_db`.`users` (`usernam`, `name`, `email`, `mobile_phone`, `password`) " +
	"VALUES ('bb', 'b b', 'bb@b.com', '0793426742', '222')";

db.query(sqlQueryInsertTable_users2,
	function (err, sqlQueryResult) {
		if (err) {
			var errObj = {
				// Type : Query err.
				type: "sqlQueryInsertTable_users2:",
				err: err,
			};

			console.log(errObj);

		} else {
			console.log("sqlQueryInsertTable_users2:");
			console.log(sqlQueryResult);
		}
	}
)

var sqlQueryInsertTable_users3 = "INSERT INTO `sharik_db`.`users` (`usernam`, `name`, `email`, `mobile_phone`, `password`) " +
	"VALUES ('cc', 'c c', 'cc@c.com', '0793741452','333')";

db.query(sqlQueryInsertTable_users3,
	function (err, sqlQueryResult) {
		if (err) {
			var errObj = {
				// Type : Query err.
				type: "sqlQueryInsertTable_users3:",
				err: err,
			};

			console.log(errObj);

		} else {
			console.log("sqlQueryInsertTable_users3:");
			console.log(sqlQueryResult);
		}
	}
)
*/