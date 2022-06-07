"use strict";

var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId;


const StudentSchema = new Mongoose.Schema(
  {
    school_id: {type: ObjectId, ref: 'schools'},
    yearlevel: {type: String},
    total: {type: Number},
    isDeleted: {type: Boolean, default: false},
  },
  {
    timestamps: true,
    _id: true,
  }
);

var Student = Mongoose.model("students", StudentSchema);

module.exports = Student;
