"use strict";

var Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId;


const FurnitureSchema = new Mongoose.Schema(
  {
    school_id: {type: ObjectId, ref: 'schools'},
    user_id: {type: ObjectId, ref: 'users'},
    school_id: {type: ObjectId, ref:'schools'},
    name: {type: String},
    total: {type: Number},
    isDeleted: {type: Boolean, default: false},
  },
  {
    timestamps: true,
    _id: true,
  }
);

var Furnitures = Mongoose.model("furnitures", FurnitureSchema);

module.exports = Furnitures;
