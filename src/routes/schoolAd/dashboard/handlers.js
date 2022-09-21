"use strict";

const Buildings = require("../../../database/models/building");
const Schools = require("../../../database/models/school");
const Facilities = require("../../../database/models/facility");
const Students = require("../../../database/models/student");
const Rooms = require("../../../database/models/room");
const Temporary = require("../../../database/models/temporary");
const Makeshift = require("../../../database/models/makeshift");
const Users = require("../../../database/models/users");
const Request = require("../../../database/models/request");
const Mongoose = require('mongoose');
var internals = {};
var Async = require('async');

internals.dashboard = async function (req, reply) {
    try {
      var building_list = {};
      var school_ids = req.auth.credentials.school_id;
      building_list.minor = 0;
      building_list.major = 0;
      building_list.good = 0;

      const school_id = req.auth.credentials.school_id;
      const totalBuilding = await Buildings.countDocuments({school_id});
      const totalRoom = await Rooms.countDocuments({school_id});

      //const totalStdents = await Students.countDocuments({school_id});
      //const totalRoom = await Rooms.countDocuments({building_id})
    //   const totalRooms = await Rooms.aggregate([
    //     {
    //         $lookup: {
    //             from: "rooms",
    //             localField: "_id",
    //             foreignField: "building_id",
    //             as: "rooms",
    
    //     },
    //     }, 
    // ])
    const school = await Schools.findOne({ _id : school_ids}).lean()
    const buildings = await Buildings.find({ school_id : school_id }).sort({' buildingNumber': 1}).lean()

    

    const minor  = await Buildings.count({ $and: [{school_id : school_ids }, {buildingCondition: 'MINOR DAMAGE'}]}).lean()
    building_list.minor =minor;
    const major  = await Buildings.count({ $and: [{school_id : school_ids }, {buildingCondition: 'MAJOR DAMAGE'}]}).lean()
    building_list.major =major;
    const good  = await Buildings.count({ $and: [{school_id : school_ids }, {buildingCondition: 'GOOD CONDITION'}]}).lean()
    building_list.good =good;
    console.log('building_list', buildings);

      const separateRoom = await Rooms.aggregate([
        {$group: {
                  _id: "$building_id",
                   roomCondition: { $push: "$roomCondition" },
        }
        }
    ])
    // separateRoom.forEach(v=> v.separateRoom)

    console.log('-------->>>>>>', separateRoom);

      const students = await Students.aggregate(
        [ {$match:{ school_id: Mongoose.Types.ObjectId(req.auth.credentials.school_id)}},
          {
            $group: {
              _id: "_id",
              totalStudent: {
                $sum: "$total"
              }
            }
          }
        ]
     );
     const makeshift = await Makeshift.aggregate(
      [ {$match:{ school_id: Mongoose.Types.ObjectId(req.auth.credentials.school_id)}},
        {
          $group: {
            _id: "_id",
            useMakeshift: {
              $sum: { $divide: [ "$useMakeshift", 2 ] }
            }
          }
        }
      ]
   );
   const temporary = await Temporary.aggregate(
    [ {$match:{ school_id: Mongoose.Types.ObjectId(req.auth.credentials.school_id)}},
      {
        $group: {
          _id: "_id",
          useTemporary: {
            $sum: "$usetemporary"
          }
        }
      }
    ]
 );

//  const buildDamage = await Buildings.aggregate([ 
//   { $match : { 
//     $and:[
//       {school_id: Mongoose.Types.ObjectId(req.auth.credentials.school_id)},
//       {isDeleted: false}
//     ]
//   }},
  
// ]);


// const minorDamage = await Buildings.aggregate([ 
//   { $match : { buildingCondition: "MINOR DAMAGE"}},
  
// ]);

const buildingRequest = await Buildings.find({
  $or:[
    {$and: [
      {school_id: req.auth.credentials.school_id},
      { buildingCondition: "MINOR DAMAGE"},
    ]},
    {$and: [
      {school_id: req.auth.credentials.school_id},
      { buildingCondition: "MAJOR DAMAGE"},
    ]}
  ]
}).lean()
const roomRequest = await Rooms.find({
  $or:[
    {$and: [
      {school_id: req.auth.credentials.school_id},
      { roomCondition: "MINOR DAMAGE"},
    ]},
    {$and: [
      {school_id: req.auth.credentials.school_id},
      { roomCondition: "MAJOR DAMAGE"},
    ]}
  ]
}).populate('school_id building_id')
.lean()
const request = await Request.find({
  $or:[
    {$and: [
      {school_id: req.auth.credentials.school_id},
      {status: 'REQUESTED'}
    ]},
    {$and: [
      {school_id: req.auth.credentials.school_id},
      {status: 'VERIFIED'}
    ]}
  ]
}).lean();
      // console.log(roomRequest);
     const total = makeshift[0]?.useMakeshift + temporary[0]?.useTemporary
      reply.view('schoolAd/dashboard/dashboard.html', {
        totalBuilding,
        credentials: req.auth.credentials,
        totalRoom,
        // minorDamage,
        // buildDamage,
        students:students[0],
        makeshift:makeshift[0],
        temporary:temporary[0],
        message: req.query.message,
        alert: req.query.alert,
        total: isNaN(total) ? 0: total,
        request,
        buildingRequest,
        roomRequest,
        building_list,
        buildings,
        school
      });
    } catch (error) {
      console.log(error);
    }

};
internals.requestNew = async (req, reply) => {
  var payload = {
    school_id: req.auth.credentials.school_id,
    name: req.payload.name,
    specific: req.payload.specific,
    note: req.payload.note,
    status: req.payload.status,
  };
  // console.log(payload);
  const reqNew = await Request.create(payload);
  return reply.redirect('/schoolAd/dashboard?message=Request successfuly created&alert=success');
};
internals.requestBUILD = function (req, reply) {

  Buildings.findOneAndUpdate(
    { _id: req.payload.id},
    { $set: req.payload }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    return reply.redirect('/schoolAd/dashboard?message=Requested successfuly &alert=success');
  });
};
internals.requestRoom = function (req, reply) {

  Rooms.findOneAndUpdate(
    { _id: req.payload._id},
    { $set: req.payload }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    return reply.redirect('/schoolAd/dashboard?message=Requested successfuly &alert=success');
  });
};
module.exports = internals;
