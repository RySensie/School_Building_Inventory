'use strict';

var internals = {},
  Crypto = require('../../../lib/Crypto'),
  _ = require('lodash'),
  moment = require('moment');

var Users = require('../../../database/models/users');
var School = require('../../../database/models/school');
var Async = require('async');
const { findOne } = require('../../../database/models/users');
const  Buildings = require('../../../database/models/building');
const  Rooms = require('../../../database/models/room');
var email = require('../../../lib/email')
internals.adminUserView = async function (req, reply) {

  const building_damage = await Buildings.find({
    $or:[
      {$and: [
        {buildingCondition: "MAJOR DAMAGE"},
        {isDeleted:false}
      ]},
      {$and: [
        {buildingCondition: "MINOR DAMAGE"},
        {isDeleted:false}
      ]}
    ]
  }).populate('school_id')
    .lean();
    const room_damage = await Rooms.find({
      $or:[
        {$and: [
          {buildingCondition: "MAJOR DAMAGE"},
          {isDeleted:false}
        ]},
        {$and: [
          {buildingCondition: "MINOR DAMAGE"},
          {isDeleted:false}
        ]}
      ]
    }).populate('school_id')
      .lean();
      const users = await Users.find({
        isConfirm: false
      }).lean();


  var users_data = {}; var schools_data = {};

  Async.series([
    function (callback) {
      Users.find({
        scope: ['schoolAd']

      }).populate('school_id')
        .lean()
        .exec((err, data) => {
          users_data = data;
          if (err) {
            console.log(err)
          }
          //console.log(data)
          return callback(null);
        })
    },
    function (callback) {
      School.find({

      })
        .lean()
        .exec((err, data) => {
          schools_data = data;
          if (err) {
            console.log(err)
          }
          //console.log(data)
          return callback(null);
        })
    },
  ],
    function (callback) {
      reply.view('admin/people/user.html', {
        users_data,
        schools_data,
        building_damage,
        room_damage,
        users_data
      });
    }
  )
};
internals.confirmAccount = async (req, reply) => {
  try {
    console.log('--------------------?>>>>>>', req.payload.userID);
    if (req.payload.confirm) {
      const data = await Users.findByIdAndUpdate(req.payload.userID, {
        isConfirm: true,
      }, { new: true });
      console.log('----------->Updated here', data);
      email.sendEmail(data.email,"Your Account has successfully confirmed!")
    }

    reply.redirect('/admin/people');
  } catch (error) {

  }
};


module.exports = internals;