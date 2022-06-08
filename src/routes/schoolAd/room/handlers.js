'use strict';



const Buildings = require("../../../database/models/building");
const Rooms = require("../../../database/models/room");
const Async = require('async');
var upload = require('../../../lib/upload_photo');
var _ = require('lodash');
var internals = {},
  moment = require('moment');

internals.room = function (req, reply) {

  var rooms_data = {};
  var buildings_data = {};

  Async.series([
    function (callback) {
      Rooms.find({
        building_id: req.params?.building_id,
        isDeleted: false
      })
        .lean()
        .exec((err, data) => {
          rooms_data = data;
          if (err) {
            console.log(err)
          }
          //console.log(data)
          return callback(null);
        })
    },
    function (callback) {
      Buildings.findOne({
        _id: req.params?.building_id,
        isDeleted: false
      })
        .lean()
        .exec((err, data) => {
          buildings_data = data;
          if (err) {
            console.log(err)
          }
          //console.log(data)
          return callback(null);
        })
    },

  ],
    function (callback) {
      console.log('------++++>', buildings_data),
        reply.view('schoolAd/building/room/room.html', {
          rooms_data,
          buildings_data,
          credentials: req.auth.credentials,
          building_id: req.params.building_id
        });
    }
  )
};

//Update Rooms---------------------Update-----//
internals.roomUpdate = async function (req, reply) {
  var payload = {

    roomNumber: req.payload.roomNumber,
    roomCondition: req.payload.roomCondition,
    floor: req.payload.floor,
    actualUsage: req.payload.actualUsage,
    roomDimensionW: req.payload.roomDimensionW,
    roomDimensionL: req.payload.roomDimensionL
  };
  console.log(req.payload.actual_img);
  const rooms = await Rooms.findOneAndUpdate({
    _id: req.payload.edit_id 
  },{$set: payload}).lean();
  console.log(rooms);
  if(!rooms){
    return reply.redirect('/schoolAd/room/' + req.params.building_id);
  }
  if(!_.isEmpty(req.payload.actual_img)){
    upload.photo(req.payload.actual_img, 'ROOM', rooms._id);
  }

  return reply.redirect('/schoolAd/room/' + req.params.building_id);
};
// internals.roomUpdate = function (req, reply) {
//   console.log("----->>>>>>", req.params.building_id);

//   Rooms.findOneAndUpdate(
//     { _id: req.payload.edit_id },
//     { $set: req.payload }
//   ).exec((err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     return reply.redirect('/schoolAd/room/' + req.params.building_id);
//   });
// };
//Delete Rooms---------------------Delete-----
internals.roomDelete = function (req, reply) {
  console.log("----->>>>>>", req.payload.id);

  Rooms.findOneAndUpdate(
    { _id: req.payload.id },
    { $set: { isDeleted: true } }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/room/' + req.params.building_id);
  });
};
//--------------------------Delete-------------------------------//
// internals.roomDelete = function (req, reply) {
//   var myPayload = {
//     isdeleted: req.payload.isdeleted,

//   }

//   Rooms.updateOne({
//     _id: req.payload._id
//   },
//   {
//    $set: myPayload 
//   })

//     .lean()
//     .exec((err, data)=>{
//       if(err){
//         console.log(err);
//       }
//       return reply.redirect('/schoolAd/room/{building_id}');
//     })
// }

internals.roomAdd = async (req, reply) => {
  var payload = {
    school_id: req.auth.credentials.school_id,
    building_id: req.params.building_id,
    roomNumber: req.payload.roomNumber,
    floor: req.payload.floor,
    roomCondition: req.payload.roomCondition,
    actualUsage: req.payload.actualUsage,
    roomDimensionW: req.payload.roomDimensionW,
    roomDimensionL: req.payload.roomDimensionL,
  };
  console.log(payload);
  const rooms = await Rooms.create(payload);
  if (!rooms) {
    return reply.redirect('/schoolAd/room/' + req.params.building_id);
  }
  console.log(rooms);
  await Rooms.update({
    _id: rooms._id
  }, {
    $set: {
      actual_img: `/assets/uploads/ROOM/${rooms._id}.jpeg`
    }
  });
  upload.photo(req.payload.actual_img, 'ROOM', rooms._id);
  return reply.redirect('/schoolAd/room/' + req.params.building_id);
};
module.exports = internals;
