'use strict';


const Buildings = require("../../../database/models/building");
const Rooms = require("../../../database/models/room");
const Request = require("../../../database/models/request");
const Async = require('async');
var internals = {};

// internals.request = function (req, reply) {

//   var request_data = {};
//   console.log('========>', req.auth.credentials);
//   Async.series([
//     function (callback) {
//       Request.find({
//         school_id: req.auth.credentials.school_id,
//       })
//         .lean()
//         .exec((err, data) => {
//           if (err) {
//             console.log(err)
//           }
//           request_data = data;
//           //console.log(data)
//           return callback(null);
//         })
//     },
//   ],
//     function (callback) {
//       reply.view('schoolAd/dashboard/dashboard.html', {
//         request_data,
//         credentials: req.auth.credentials,
//         message: req.query.message,
//         alert: req.query.alert,
//       });
//     }
//   )
// };
internals.requestAdd = async (req, reply) => {
  var payload = {
    school_id: req.auth.credentials.school_id,
    name: req.payload.name,
    condition: req.payload.condition,
    note: req.payload.note
  };
  console.log(payload);
  const request = await Request.create(payload);
  console.log('-------)', request);
  return reply.redirect('/schoolAd/dashboard');
};
module.exports = internals;
