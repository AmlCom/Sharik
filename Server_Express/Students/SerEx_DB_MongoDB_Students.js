
var qu_tb_Students = require('../../DB/MongoDB/queries/Qu_Students.js');


module.exports = {
	selectAllStudents: function (request, response, callback) {
		console.log('<<<<<<<<<<<<<<<<');
		console.log('Data:');
		console.log('@ >> Sharik/Server_Express/Students/SerEx_DB_MongoDB_Students.js');
		console.log('@ >> selectAllStudents');
		console.log('Request Data msg:');
		console.log(request.body)
		console.log('>>>>>>>>>>>>>>>>');

		qu_tb_Students.selectAllStudents(
			function (selectAllStudentsQueryErr, selectAllStudentsQueryResulte) {
				if (selectAllStudentsQueryErr) {
					console.log('<<<<<<<<<<<<<<<<');
					console.log('Error:');
					console.log('@ >> Sharik/Server_Express/Students/SerEx_DB_MongoDB_Students.js');
					console.log('@ >> selectAllStudents');
					console.log('selectAllStudents Error msg:');
					console.log(selectAllStudentsQueryErr)
					console.log('>>>>>>>>>>>>>>>>');
					callback(selectAllStudentsQueryErr, null);

				} else {
					console.log('<<<<<<<<<<<<<<<<');
					console.log('Data:');
					console.log('@ >> Sharik/Server_Express/Students/SerEx_DB_MongoDB_Students.js');
					console.log('@ >> selectAllStudents');
					console.log('selectAllStudents Data msg:');
					console.log(selectAllStudentsQueryResulte)
					console.log('>>>>>>>>>>>>>>>>');
					callback(null, selectAllStudentsQueryResulte);
				}
			}
		);
	},

	selectOneStudent: function (request, response, callback) {
		console.log('<<<<<<<<<<<<<<<<');
		console.log('Data:');
		console.log('@ >> Sharik/Server_Express/Students/SerEx_DB_MongoDB_Students.js');
		console.log('@ >> selectOneStudent');
		console.log('Request Data msg:');
		console.log(request.body);
		console.log(request.body._id)
		console.log('>>>>>>>>>>>>>>>>');

		qu_tb_Students.selectOneStudent(request.body._id, 
			function (selectOneStudentQueryErr, selectOneStudentsQueryResulte) {
				if (selectOneStudentQueryErr) {
					console.log('<<<<<<<<<<<<<<<<');
					console.log('Error:');
					console.log('@ >> Sharik/Server_Express/Students/SerEx_DB_MongoDB_Students.js');
					console.log('@ >> selectOneStudent');
					console.log('selectOneStudentQueryErr Error msg:');
					console.log(selectOneStudentQueryErr)
					console.log('>>>>>>>>>>>>>>>>');
					callback(selectOneStudentQueryErr, null);

				} else {
					console.log('<<<<<<<<<<<<<<<<');
					console.log('Data:');
					console.log('@ >> Sharik/Server_Express/Students/SerEx_DB_MongoDB_Students.js');
					console.log('@ >> selectOneStudent');
					console.log('selectOneStudent Data msg:');
					console.log(selectOneStudentsQueryResulte)
					console.log('>>>>>>>>>>>>>>>>');
					callback(null, selectOneStudentsQueryResulte);

				}
			}
		);
	},

	updateOneStudent: function (request, response, callback) {
		console.log('<<<<<<<<<<<<<<<<');
		console.log('Data:');
		console.log('@ >> Sharik/Server_Express/Students/SerEx_DB_MongoDB_Students.js');
		console.log('@ >> updateOneStudent');
		console.log('Request Data msg:');
		console.log(request.body);
		console.log('>>>>>>>>>>>>>>>>');

		qu_tb_Students.updateOneStudent(request.body, 
			function (updateOneStudentQueryErr, updateOneStudentsQueryResulte) {
				if (updateOneStudentQueryErr) {
					console.log('<<<<<<<<<<<<<<<<');
					console.log('Error:');
					console.log('@ >> Sharik/Server_Express/Students/SerEx_DB_MongoDB_Students.js');
					console.log('@ >> updateOneStudent');
					console.log('updateOneStudentQueryErr Error msg:');
					console.log(updateOneStudentQueryErr)
					console.log('>>>>>>>>>>>>>>>>');
					callback(updateOneStudentQueryErr, null);

				} else {
					console.log('<<<<<<<<<<<<<<<<');
					console.log('Data:');
					console.log('@ >> Sharik/Server_Express/Students/SerEx_DB_MongoDB_Students.js');
					console.log('@ >> updateOneStudent');
					console.log('updateOneStudent Data msg:');
					console.log(updateOneStudentsQueryResulte)
					console.log('>>>>>>>>>>>>>>>>');
					callback(null, updateOneStudentsQueryResulte);

				}
			}
		);
	},
}