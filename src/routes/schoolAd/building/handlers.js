'use strict';

var internals = {},
  Buildings = require("../../../database/models/building");
  var Sharp = require('sharp');
var Async = require('async');
var upload  = require('../../../lib/upload_photo');
var _ = require('lodash');

internals.buildings = function (req, reply) {

  var buildings_data = {};

  console.log('========>', req.auth.credentials);
  Async.series([
    function (callback) {
      Buildings.find({
        school_id: req.auth.credentials.school_id,
        isDeleted:false

      })
        .lean()
        .exec((err, data) => {
          if (err) {
            console.log(err)
          }
          buildings_data = data;
          //console.log(data)
          return callback(null);
        })
    },
  ],
    function (callback) {
      reply.view('schoolAd/building/building.html', {
        buildings_data,
        credentials: req.auth.credentials,
      });
    }
  )
};
internals.createAdd = async function (req, reply) {
  reply.view('schoolAd/building/add.html', {
    message: req.query.message,
    alert: req.query.alert,
  });
};

internals.add = async (req, reply) => {
  var payload = {
    school_id: req.auth.credentials.school_id,
    schoolName: req.payload.schoolName,
    buildingNumber: req.payload.buildingNumber,
    buildingType: req.payload.buildingType,
    fundSource: req.payload.fundSource,
    specificFundSource: req.payload.specificFundSource,
    buildingCondition: req.payload.buildingCondition,
    numberOfStorey: req.payload.numberOfStorey,
    numberOfRooms: req.payload.numberOfRooms,
    yearCompleted: req.payload.yearCompleted,
    classificationOfBuilding: req.payload.classificationOfBuilding,
    pwdAccessible: req.payload.pwdAccessible,
    undergoneMajorRepair: req.payload.undergoneMajorRepair,
    certificateOfAcceptance: req.payload.certificateOfAcceptance,
    includeDepedBook: req.payload.includeDepedBook,
    buildingMaterial: req.payload.buildingMaterial,
    dateAcquisition: req.payload.dateAcquisition,
    acquisitionCost: req.payload.acquisitionCost,
    bookValue: req.payload.bookValue,
    insuranceInfo: req.payload.insuranceInfo,
    status: req.payload.status,
  };
  console.log(payload);
  const building = await Buildings.create(payload);
  if(!building){
    return reply.redirect('/schoolAd/building?message=Problem occured!&alertType=danger');
  }
  console.log(building);
  await Buildings.update({
    _id: building._id
  },{
    $set: {
      actual_img: `/assets/uploads/ACTUAL/${building._id}.jpeg`,
      blueprint_img: `/assets/uploads/BLUEPRINT/${building._id}.jpeg`,
      proof_img: `/assets/uploads/PROOF/${building._id}.jpeg`
    }
  });
  upload.photo(req.payload.actual_img, 'ACTUAL', building._id);
  upload.photo(req.payload.blueprint_img, 'BLUEPRINT',  building._id);
  upload.photo(req.payload.proof_img, 'PROOF',  building._id);
  return reply.redirect('/schoolAd/building');
};

internals.buildingDetails = async (req, reply) => {
  console.log('-------->', req.params.id)
  try {
    const { id } = req.params;
    const building = await Buildings.findById(id).lean();
    if (!building) throw new Error('Invalid ID');
    console.log('IMAGESSSSSSSSSS', building);
    reply.view("schoolAd/building/buildingdetails.html", {
      credentials: req.auth.credentials,
      message: req.query.message,
      alert: req.query.alert,
      building,
      building_id: req.params.id
      //:JSON.stringify(building,null,2)
    });
  } catch (err) {
    console.log(err)
    reply.redirect("/schoolAd/building?message=Internal error! &alert=error");
  }
};
//-----------------Update Building---------------------//
internals.buildingUpdate = async function (req, reply) {
  var payload = {
    school_id: req.auth.credentials.school_id,
    schoolName: req.payload.schoolName,
    buildingNumber: req.payload.buildingNumber,
    buildingType: req.payload.buildingType,
    fundSource: req.payload.fundSource,
    specificFundSource: req.payload.specificFundSource,
    buildingCondition: req.payload.buildingCondition,
    numberOfStorey: req.payload.numberOfStorey,
    numberOfRooms: req.payload.numberOfRooms,
    yearCompleted: req.payload.yearCompleted,
    classificationOfBuilding: req.payload.classificationOfBuilding,
    pwdAccessible: req.payload.pwdAccessible,
    undergoneMajorRepair: req.payload.undergoneMajorRepair,
    certificateOfAcceptance: req.payload.certificateOfAcceptance,
    includeDepedBook: req.payload.includeDepedBook,
    buildingMaterial: req.payload.buildingMaterial,
    dateAcquisition: req.payload.dateAcquisition,
    acquisitionCost: req.payload.acquisitionCost,
    bookValue: req.payload.bookValue,
    insuranceInfo: req.payload.insuranceInfo,
    status: req.payload.status,
  };
  console.log(payload);
  const building = await Buildings.findOneAndUpdate({
    _id: req.payload.edit_id
  },{$set: payload}).lean();
  console.log(building);
  if(!building){
    return reply.redirect('/schoolAd/building?message=Problem occured!&alertType=danger');
  }
  if(!_.isEmpty(req.payoad.actual_img)){
    upload.photo(req.payload.actual_img, 'ACTUAL', building._id);
  }

  return reply.redirect('/schoolAd/building?message=successfully updated&alertType=success');
};
//------------------Delete building-----------------//
// internals.buildingDelete = function (req, reply) {

//   Buildings.findOneAndUpdate(
//     { _id: req.payload.id },
//     { $set: {isDeleted:true} }
//   ).exec((err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     return reply.redirect('/schoolAd/building?message=Internal error! &alert=error');
//   });
// };
module.exports = internals;
