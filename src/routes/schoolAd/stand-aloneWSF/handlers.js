'use strict';

var internals = {},
SchoolWSF = require("../../../database/models/standAWateASanitation");

var Async = require('async');


internals.standAlone = function (req, reply) {

  var schoolWSF_data = {};

  Async.series([
    function (callback) {
      SchoolWSF.find({
        school_id: req.auth.credentials.school_id,
        isDeleted:false

      })
        .lean()
        .exec((err, data) => {
          if (err) {
            console.log(err)
          }
          schoolWSF_data = data;
          return callback(null);
        })
    },
  ],
    function (callback) {
      reply.view('schoolAd/stand-aloneWSF/stand-aloneWSF.html', {
        schoolWSF_data,
        credentials: req.auth.credentials,
        message: req.query.message,
        alert: req.query.alert,
      });
    }
  )
};
internals.standAdd = (req, reply) => {
  Async.series([
    (callback) => {
      var payload = {
        school_id: req.auth.credentials.school_id,
        male: req.payload.male,
        fmale: req.payload.fmale,
        shared: req.payload.shared,
        pwd: req.payload.pwd,
        nonfunc: req.payload.nonfunc,
        numberWashbin: req.payload.numberWashbin,
        urinals: req.payload.urinals,
        UrinalsTrou: req.payload.UrinalsTrou,
        septicTank: req.payload.septicTank,
        wfaucet: req.payload.wfaucet,
        wOutFaucet: req.payload.wOutFaucet,
      }
      var saveMe = new SchoolWSF(payload);
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
      return reply.redirect('/schoolAd/standAlone');
    })
};

internals.standUpdate = function (req, reply) {


  SchoolWSF.findOneAndUpdate(
    { _id: req.payload.edit_id },
    { $set: req.payload }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/standAlone?message=successfuly updated&alert=success');
  });
};

internals.standDelete = function (req, reply) {


  SchoolWSF.findOneAndUpdate(
    { _id: req.payload.id },
    { $set: {isDeleted:true} }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/standAlone?message=successfuly updated&alert=success');
  });
};
module.exports = internals;
