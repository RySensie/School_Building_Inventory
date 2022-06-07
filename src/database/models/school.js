"use strict";

var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId;


const SchoolSchema = new Mongoose.Schema(
  {
    user_id: {type: ObjectId, ref: 'users'},
    schoolName: {type: String},
    schoolId: {type: Number},
    address: {type: String},
    logo_img: { type: String},
  },
  {
    timestamps: true,
    _id: true,
  }
);

var School = Mongoose.model("schools", SchoolSchema);

module.exports = School;
