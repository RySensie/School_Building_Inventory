"use strict";

var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId;


const HiddenSchema = new Mongoose.Schema(
  {
    schoolName: {type: String},
    schoolId: {type: Number},
    address: {type: String},
  },
  {
    timestamps: true,
    _id: true,
  }
);

var Hidden = Mongoose.model("hidden", HiddenSchema);

module.exports = Hidden;
