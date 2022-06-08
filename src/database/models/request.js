"use strict";

var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId;


const RequestSchema = new Mongoose.Schema(
  {
    user_id: {type: ObjectId, ref: 'users'},
    school_id: {type: ObjectId, ref: 'schools'},
    name: {type: String},
    specific: {type: String},
    note: {type: String},
    status: {type: String},

  },
  {
    timestamps: true,
    _id: true,
  }
);

var Request = Mongoose.model("requets", RequestSchema);

module.exports = Request;
