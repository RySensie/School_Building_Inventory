'use strict';

var internals = {},
 Students = require("../../../database/models/student");

var Async = require('async');


// internals.student = function (req, reply) { 
//     reply.view('schoolAd/student/student.html', {
//       message: req.query.message,
//       alert: req.query.alert,
//     });
//   };
internals.student = function (req, reply) {

    var student_data = {};
  
    console.log('========>', req.auth.credentials);
    Async.series([
      function (callback) {
        Students.find({
           school_id: req.auth.credentials.school_id,
           isDeleted:false
  
        })
          .lean()
          .exec((err, data) => {
            if (err) {
              console.log(err)
            }
            student_data  = data;
            //console.log(data)
            return callback(null);
          })
      },
    ],
      function (callback) {
        reply.view('schoolAd/student/student.html', {
          student_data,
          credentials: req.auth.credentials,
          message: req.query.message,
          alert: req.query.alert,
        });
      }
    )
  };
internals.studentAdd = (req, reply) => {
    Async.series([
      (callback) => {
        var payload = {
          school_id: req.auth.credentials.school_id,
          yearlevel: req.payload.yearlevel,
          total: req.payload.total,
        }
        console.log('=======> ', payload);
        var saveMe = new Students(payload);
        saveMe.save(function (err, data) {
          if (err) {
            console.log(err);
          }
          console.log(data);
          return callback(null);
        });
      },
  
    ],
      function (callback) {
        return reply.redirect('/schoolAd/student');
      })
 };
 internals.studentUpdate = function (req, reply) {


  Students.findOneAndUpdate(
    { _id: req.payload.edit_id },
    { $set: req.payload }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/student?message=successfuly updated&alert=success');
  });
};

internals.studentDelete = function (req, reply) {


  Students.findOneAndUpdate(
    { _id: req.payload.id },
    { $set: {isDeleted:true} }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/student?message=successfuly updated&alert=success');
  });
};
module.exports = internals;
