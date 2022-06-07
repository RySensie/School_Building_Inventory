'use strict';


const Hidden = require('../../../database/models/hidden');
var Async = require('async');
var internals = {};

internals.hidden = function (req, reply) {
      reply.view('admin/hidden/index.html')
};
internals.addhidden = (req, reply) => {
  Async.series([
    (callback) => {
      var payload = {
        schoolName: req.payload.schoolName,
        schoolId: req.payload.schoolId,
        address: req.payload.address,
      }
      console.log('=======> ', payload);
      var saveMe = new Hidden(payload);
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
      return reply.redirect('/admin/hidden');
    })
};
module.exports = internals;
