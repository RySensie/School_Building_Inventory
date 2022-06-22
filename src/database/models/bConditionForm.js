"use strict";

var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId;


const BConditionSchema = new Mongoose.Schema(
  {
    school_id: {type: ObjectId, ref: 'schools'},
    user_id: {type: ObjectId, ref: 'users'},
    building_id:{type: ObjectId, ref: 'buildings'},
    roof: {type: String},
    paint: {type: String},
    wall: {type: String},
    ceiling: {type: String},
    crack: {type: String},

  },
  {
    timestamps: true,
    _id: true,
  }
);

var BCondition = Mongoose.model("bcondition", BConditionSchema);

module.exports = BCondition;


