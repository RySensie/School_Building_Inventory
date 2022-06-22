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
    status: {type: String, default: 'UNREQUESTED'},
    note: {type: String},
    percentage: {type: Number, default: 0},
    door: {type: String, default: 'uncheck'},
    window: {type: String, default: 'uncheck'},
    flooring: {type: String, default: 'uncheck'},
    beam: {type: String, default: 'uncheck'},
    column: {type: String, default: 'uncheck'},
    board: {type: String, default: 'uncheck'},
    wall: {type: String, default: 'uncheck'},
    ceiling: {type: String, default: 'uncheck'},
    toilet: {type: String, default: 'uncheck'},
    electric: {type: String, default: 'uncheck'},
  },
  {
    timestamps: true,
    _id: true,
  }
);

var Rooms = Mongoose.model("rooms", RoomSchema);

module.exports = Rooms;


