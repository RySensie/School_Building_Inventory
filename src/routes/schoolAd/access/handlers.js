'use strict';


const Access = require("../../../database/models/access");
 
var internals = {};
var Async = require('async');


internals.transport = function (req, reply) { 
  var access_data = {};

  console.log('========>', req.auth.credentials);
  Async.series([
    function (callback) {
        Access.find({
        school_id: req.auth.credentials.school_id,
        isDeleted:false

      })
        .lean()
        .exec((err, data) => {
          if (err) {
            console.log(err)
          }
          access_data = data;
          //console.log(data)
          return callback(null);
        })
    },
  ],
    function (callback) {
      reply.view('schoolAd/transportation/transportation.html', {
        access_data,
        message: req.query.message,
        alert: req.query.alert,
      });
    }
  )
};

internals.transportAdd =  async (req, reply) => {
    var payload = {
        school_id: req.auth.credentials.school_id,
        user_id: req.payload.user_id,
        roadType: req.payload.roadType,
        transportation: req.payload.transportation,
        };
    console.log('???????????>', payload);
    const access = await Access.create(payload);
        if(!access){
          return reply.redirect('/schoolAd/transport?message=Problem occured!&alertType=danger');
        }
        return reply.redirect('/schoolAd/transport?message=Successfully created!&alertType=success');
};
internals.transportUpdate = function (req, reply) {


    Access.findOneAndUpdate(
      { _id: req.payload.edit_id },
      { $set: req.payload }
    ).exec((err, data) => {
      if (err) {
        console.log(err);
      }
      return reply.redirect('/schoolAd/transport?message=successfuly updated&alert=success');
    });
};
internals.transportDelete = function (req, reply) {


    Access.findOneAndUpdate(
      { _id: req.payload.id },
      { $set: {isDeleted:true} }
    ).exec((err, data) => {
      if (err) {
        console.log(err);
      }
      return reply.redirect('/schoolAd/transport?message=successfuly Deleted &alert=success');
    });
  };
module.exports = internals;
