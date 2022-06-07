"use strict";
/**
 * ## Imports
 *
 */
//Mongoose - the ORM
const Mongoose = require("mongoose"),
  ObjectId = Mongoose.Schema.Types.ObjectId,
  Schema = Mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

const UserSchema = new Mongoose.Schema(
  {
    
    school_id: {type: ObjectId, ref: 'schools'},
    isConfirm:{
      type: Boolean, 
      default: false, 
    },
    firstname: { type: String},
    lastname: { type: String},
    email: { type: String, unique: true},
    profile_img: { type: String},
    password: { type: String},
    scope: {
      type: Array,
      default: ['schoolAd'],
    },
  },
  {
    timestamps: true,
    _id: true,
  }
);

const User = Mongoose.model("users", UserSchema);

module.exports = User;
