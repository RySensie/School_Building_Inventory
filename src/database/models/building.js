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

const buildingSchema = new Mongoose.Schema({
  school_id: {type: ObjectId, ref: 'schools'},
  user_id: {type: ObjectId, ref: 'users'},
  buildingNumber: { type: String},
  buildingType: { type: String},
  fundSource: { type: String},
  specificFundSource: { type: String},
  buildingCondition: { type: String},
  numberOfStorey: { type: Number },
  numberOfRooms: { type: Number },
  yearCompleted: { type: String },
  classificationOfBuilding: { type: String },
  pwdAccessible: { type: String },
  undergoneMajorRepair: { type: String },
  certificateOfAcceptance: { type: String },
  includeDepedBook: { type: String },
  buildingMaterial: {type: String},
  dateAcquisition: {type: String},
  acquisitionCost: {type: Number},
  bookValue: {type: String},
  insuranceInfo: {type: String},
  actual_img: {type: String},
  blueprint_img: {type: String},
  proof_img: {type: String},
  isDeleted: {type: Boolean, default: false},
}, {
  timestamps: true,
  _id: true,
});

var Buildings = Mongoose.model("buildings", buildingSchema);

module.exports = Buildings;