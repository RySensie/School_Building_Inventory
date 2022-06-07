"use strict";

const Buildings = require("../../../database/models/building");
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
 const buildDamage = await Buildings.aggregate([ 
  { $match : { 
    $and:[
      {school_id: Mongoose.Types.ObjectId(req.auth.credentials.school_id)},
      {isDeleted: false}
    ]
  }},
  
]);


const minorDamage = await Buildings.aggregate([ 
  { $match : { buildingCondition: "MINOR DAMAGE"}},
  
]);
const request = await Request.find({
  $or:[
    {$and: [
      {school_id: req.auth.credentials.school_id},
      {status: 'PENDING'}
    ]},
    {$and: [
      {school_id: req.auth.credentials.school_id},
      {status: 'APPROVED'}
    ]}
  ]
}).lean();
     const total = makeshift[0]?.useMakeshift + temporary[0]?.useTemporary
      reply.view('schoolAd/dashboard/dashboard.html', {
        totalBuilding,
        credentials: req.auth.credentials,
        totalRoom,
        minorDamage,
        buildDamage,
        students:students[0],
        makeshift:makeshift[0],
        temporary:temporary[0],
        message: req.query.message,
        alert: req.query.alert,
        total: isNaN(total) ? 0: total,
        request,
      });
    } catch (error) {
      console.log(error);
    }

};

module.exports = internals;