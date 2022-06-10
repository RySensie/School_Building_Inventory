'use strict';

var internals = {},
  Furnitures = require("../../../database/models/furniture");

var Async = require('async');


internals.furniture = function (req, reply) {
  var furniture_data = {};

  // console.log('========>', req.auth.credentials);
  Async.series([
    function (callback) {
      Furnitures.find({
        school_id: req.auth.credentials.school_id,
        isDeleted:false

      })
        .lean()
        .exec((err, data) => {
          if (err) {
            console.log(err)
          }
          furniture_data = data;
          //console.log(data)
          return callback(null);
        })
    },
  ],
    function (callback) {
      reply.view('schoolAd/furniture/furniture.html', {
        furniture_data,
        credentials: req.auth.credentials,
        message: req.query.message,
        alert: req.query.alert,
      });
    }
  )
};

internals.addFurniture = (req, reply) => {
  Async.series([
    (callback) => {
      var payload = {
        school_id: req.auth.credentials.school_id,
        // user_id: req.payload.user_id,
        name: req.payload.name,
        total: req.payload.total,
      }
      // console.log('=======> ', payload);
      var saveMe = new Furnitures(payload);
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
      return reply.redirect('/schoolAd/furniture');
    })
};
internals.furnitureUpdate = function (req, reply) {


  Furnitures.findOneAndUpdate(
    { _id: req.payload.edit_id },
    { $set: req.payload }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/furniture?message=successfuly updated&alert=success');
  });
};

internals.furnitureDelete = function (req, reply) {


  Furnitures.findOneAndUpdate(
    { _id: req.payload.id },
    { $set: { isDeleted: true } }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/furniture?message=successfuly updated&alert=success');
  });
};
module.exports = internals;
