// ***************************************************************
// var db = require("../connect");
var Student = require("../schema/sharik_db__users_schema.js");

// Table:
// ------------------------

module.exports = {
    // Table Student Functions:
    // ------------------------

    // 1.3.1 Create (Save) a Student in the DB Student table:
    createStudent: function (data, callback) {
        console.log('<<<<<<<<<<<<<<<<');
        console.log('Data:');
        console.log('@ >> Sharik/DB/MongoDB/queries/Qu_Students.js');
        console.log('@ >> createStudent');
        console.log('Data msg:');
        console.log(data)
        console.log('>>>>>>>>>>>>>>>>');

        let student = new Student({

        });

        student.save(function (saveContactErr, saveContactResult) {
            if (saveContactErr) {
                callback(saveContactErr, null);
            } else {
                callback(null, saveContactResult);
            }
        });
    },

    // Select all Students:
    selectAllStudents: function (callback) {
        Student.find({}, function (selectAllStudentsQueryErr, selectAllStudentsQueryResulte) {
            if (selectAllStudentsQueryErr) {
                console.log('<<<<<<<<<<<<<<<<');
                console.log('Error:');
                console.log('@ >> Sharik/DB/MongoDB/queries/Qu_Students.js');
                console.log('@ >> selectAllStudents');
                console.log('Error msg:');
                console.log(selectAllStudentsQueryErr)
                console.log('>>>>>>>>>>>>>>>>');

                callback(selectAllStudentsQueryErr, null);
            } else {
                console.log('<<<<<<<<<<<<<<<<');
                console.log('Data:');
                console.log('@ >> Sharik/DB/MongoDB/queries/Qu_Students.js');
                console.log('@ >> selectAllStudents');
                console.log('Data msg:');
                console.log(selectAllStudentsQueryResulte)
                console.log('>>>>>>>>>>>>>>>>');

                callback(null, selectAllStudentsQueryResulte);
            }
        });
    },

    // Select One Students: selectOneStudent
    selectOneStudent: function (_id, callback) {
        console.log('<<<<<<<<<<<<<<<<');
		console.log('Data:');
		console.log('@ >> Sharik/DB/MongoDB/queries/Qu_Students.js');
		console.log('@ >> selectOneStudent');
		console.log('Data msg:');
		console.log(_id)
		console.log('>>>>>>>>>>>>>>>>');
        Student.find(
            {_id: _id},
            function(selectOneStudentsQueryErr, selectOneStudentsQueryResulte) {
                if (selectOneStudentsQueryErr) {
                    console.log('<<<<<<<<<<<<<<<<');
                    console.log('Error:');
                    console.log('@ >> Sharik/DB/MongoDB/queries/Qu_Students.js');
                    console.log('@ >> selectOneStudents');
                    console.log('Error msg:');
                    console.log(selectOneStudentsQueryErr)
                    console.log('>>>>>>>>>>>>>>>>');

                    callback(selectOneStudentsQueryErr, null);
                } else {
                    console.log('<<<<<<<<<<<<<<<<');
                    console.log('Data:');
                    console.log('@ >> Sharik/DB/MongoDB/queries/Qu_Students.js');
                    console.log('@ >> selectOneStudents');
                    console.log('Data msg:');
                    console.log(selectOneStudentsQueryResulte)
                    console.log('>>>>>>>>>>>>>>>>');

                    callback(null, selectOneStudentsQueryResulte);
                }
            });
    },
    
    // Update One Students: 
    updateOneStudent: function (studentData, callback) {
        console.log('<<<<<<<<<<<<<<<<');
		console.log('Data:');
		console.log('@ >> Sharik/DB/MongoDB/queries/Qu_Students.js');
		console.log('@ >> updateOneStudent');
		console.log('Student Data msg:');
		console.log(studentData)
		console.log('>>>>>>>>>>>>>>>>');
        Student.findByIdAndUpdate(
            studentData._id,
            studentData,
            function(updateOneStudentQueryErr, updateOneStudentQueryResulte) {
                if (updateOneStudentQueryErr) {
                    console.log('<<<<<<<<<<<<<<<<');
                    console.log('Error:');
                    console.log('@ >> Sharik/DB/MongoDB/queries/Qu_Students.js');
                    console.log('@ >> updateOneStudent');
                    console.log('@ >> findByIdAndUpdate');
                    console.log('Error msg:');
                    console.log(updateOneStudentQueryErr)
                    console.log('>>>>>>>>>>>>>>>>');

                    callback(updateOneStudentQueryErr, null);
                } else {
                    console.log('<<<<<<<<<<<<<<<<');
                    console.log('Data:');
                    console.log('@ >> Sharik/DB/MongoDB/queries/Qu_Students.js');
                    console.log('@ >> updateOneStudent');
                    console.log('@ >> findByIdAndUpdate');
                    console.log('updateOneStudentQueryResulte msg:');
                    console.log(updateOneStudentQueryResulte)
                    console.log('>>>>>>>>>>>>>>>>');

                    callback(null, updateOneStudentQueryResulte);
                }
            });
    },
}
