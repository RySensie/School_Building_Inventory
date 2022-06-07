"use strict";

var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId;


const AccessSchema = new Mongoose.Schema(
  {
    school_id: {type: ObjectId, ref: 'schools'},
    user_id: {type: ObjectId, ref: 'users'},
    roadType: {type: String},
    transportation: {type: String},
    isDeleted: {type: Boolean, default: false},
  },
  {
    timestamps: true,
    _id: true,
  }
);

var Access = Mongoose.model("access", AccessSchema);

module.exports = Access;
