'use strict';


const Users = require("../../../database/models/users");
const Schools = require("../../../database/models/school");

var internals = {};
var Async = require('async');

internals.profile = async function (req, reply) {

  const school_info = await Schools.find({
    _id: req.auth.credentials.school_id
  }).lean(); 
    console.log('========?>>>>', school_info); 
     return reply.view('schoolAd/profile/profile.html', {
      school_info,
      credentials: req.auth.credentials,
      message: req.query.message,
      alert: req.query.alert,
    }
  )
};
//Update Facility---------------------Update-----
internals.update = async function (req, reply) {

  await Users.findOneAndUpdate(
    { _id: req.auth.credentials},
    { $set: req.payload }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
  });
  await Schools.findOneAndUpdate(
    { _id: req.payload.school_id },
    { $set: req.payload }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
  });
  return reply.redirect('/schoolAd/profile?message=Successfuly updated&alert=success');
};

module.exports = internals;
