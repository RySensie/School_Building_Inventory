"use strict";

var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId;


const FacilitySchema = new Mongoose.Schema(
  {
    school_id: {type: ObjectId, ref: 'schools'},
    user_id: {type: ObjectId, ref: 'users'},
    name: {type: String},
    presentCampus: {type: String},
    status: {type: String},
    isDeleted: {type: Boolean, default: false},
  },
  {
    timestamps: true,
    _id: true,
  }
);

var Facilities = Mongoose.model("facilities", FacilitySchema);

module.exports = Facilities;
