"use strict";

var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId;


const RoomSchema = new Mongoose.Schema(
  {
    school_id: {type: ObjectId, ref: 'schools'},
    user_id: {type: ObjectId, ref: 'users'},
    building_id:{type: ObjectId, ref: 'buildings'},
    roomNumber: {type: Number},
    roomCondition: {type: String},
    actualUsage: {type: String},
    roomDimensionW: {type: Number},
    roomDimensionL: {type: Number},
    floor: {type: Number},
    isDeleted: {type: Boolean, default: false},
    actual_img: {type: String},
  },
  {
    timestamps: true,
    _id: true,
  }
);

var Rooms = Mongoose.model("rooms", RoomSchema);

module.exports = Rooms;


