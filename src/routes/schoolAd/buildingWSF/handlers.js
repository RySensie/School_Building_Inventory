'use strict';

var internals = {},
BuildingWSF = require("../../../database/models/buildingWSF");

var Async = require('async');

internals.buildingWSF = function (req, reply) {

  var buildingWSF_data = {};

  Async.series([
    function (callback) {
      BuildingWSF.find({
        building_id: req.params?.building_id,
        isDeleted:false

      })
        .lean()
        .exec((err, data) => {
          if (err) {
            console.log(err)
          }
          buildingWSF_data = data;
          return callback(null);
        })
    },
  ],
    function (callback) {
      reply.view('schoolAd/building/buildingWSF/buildingWSF.html', {
        buildingWSF_data,
        credentials: req.auth.credentials,
        building_id: req.params.building_id,
        message: req.query.message,
        alert: req.query.alert,
      });
    }
  )
};

internals.buildingWSF_add = (req, reply) => {
  Async.series([
    (callback) => {
      var payload = {
        school_id: req.auth.credentials.school_id,
        building_id: req.params.building_id,
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
      var saveMe = new BuildingWSF(payload);
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
      return reply.redirect('/schoolAd/building/buildingWSF/'+req.params.building_id);
    })
};

//Update Building Water & Sanitation Facility---------------------Update-----
internals.buildingWSFUpdate = function (req, reply) {

  BuildingWSF.findOneAndUpdate(
    { _id: req.payload.edit_id },
    { $set: req.payload }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/building/buildingWSF/'+req.params.building_id);
  });
};


module.exports = internals;
