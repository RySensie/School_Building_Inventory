'use strict';

var internals = {},
  Facilities = require("../../../database/models/facility");

var Async = require('async');

internals.facility = function (req, reply) {

  var facility_data = {};

  console.log('========>', req.auth.credentials);
  Async.series([
    function (callback) {
      Facilities.find({
        school_id: req.auth.credentials.school_id,
        isDeleted:false
      })
        .lean()
        .exec((err, data) => {
          if (err) {
            console.log(err)
          }
          facility_data = data;
          //console.log(data)
          return callback(null);
        })
    },
  ],
    function (callback) {
      reply.view('schoolAd/facility/facility.html', {
        facility_data,
        credentials: req.auth.credentials,
        message: req.query.message,
        alert: req.query.alert,
      });
    }
  )
};

internals.addFacility = (req, reply) => {
  Async.series([
    (callback) => {
      var payload = {
        school_id: req.auth.credentials.school_id,
        user_id: req.payload.user_id,
        name: req.payload.name,
        presentCampus: req.payload.presentCampus,
        status: req.payload.status,
      }
      console.log('=======> ', payload);
      var saveMe = new Facilities(payload);
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
      return reply.redirect('/schoolAd/facility');
    })
};

//Update Facility---------------------Update-----
internals.facilityUpdate = function (req, reply) {


  Facilities.findOneAndUpdate(
    { _id: req.payload.edit_id },
    { $set: req.payload }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/facility?message=Package successfuly updated&alert=success');
  });
};
//Delete Rooms---------------------Delete-----
internals.facilityDelete = function (req, reply) {


  Facilities.findOneAndUpdate(
    { _id: req.payload.id },
    { $set: {isDeleted:true} }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/facility?message=Package successfuly updated&alert=success');
  });
};
module.exports = internals;
