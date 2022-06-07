"use strict";

var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId;


const MakeShiftSchema = new Mongoose.Schema(
  {
    school_id: {type: ObjectId, ref: 'schools'},
    user_id: {type: ObjectId, ref: 'users'},
    makeshift: {type: Number},
    useMakeshift: {type: Number},
    isDeleted: {type: Boolean, default: false},

  },
  {
    timestamps: true,
    _id: true,
  }
);

var Makeshift = Mongoose.model("makeshift", MakeShiftSchema );

module.exports = Makeshift;
