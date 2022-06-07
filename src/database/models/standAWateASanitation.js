"use strict";

var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId;


const SchoolWSFSchema = new Mongoose.Schema(
  {
    school_id: {type: ObjectId, ref: 'schools'},
    user_id: {type: ObjectId, ref: 'users'},
    male: {type: Number},
    fmale: {type: Number},
    shared: {type: Number},
    pwd: {type: Number},
    nonfunc: {type: Number},
    numberWashbin: {type: Number},
    urinals: {type: Number},
    UrinalsTrou: {type: Number},
    septicTank: {type: String},
    wfaucet: {type: Number},
    wOutFaucet: {type: Number},
    isDeleted: {type: Boolean, default: false},
  },
  {
    timestamps: true,
    _id: true,
  }
);

var SchoolWSF = Mongoose.model("schoolsWSF", SchoolWSFSchema);

module.exports = SchoolWSF;
