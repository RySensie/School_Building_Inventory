'use strict';


const Temporary = require("../../../database/models/temporary");
const Makeshift = require("../../../database/models/makeshift");

var internals = {};
var Async = require('async');

internals.temporary = function (req, reply) {

  var temporary_data = {};
  var makeshift_data = {};

  Async.series([
    function (callback) {
      Temporary.find({
        school_id: req.auth.credentials.school_id,
        isDeleted:false

      })
        .lean()
        .exec((err, data) => {
          if (err) {
            console.log(err)
          }
          temporary_data = data;
          //console.log(data)
          return callback(null);
        })
    },
    function (callback) {
      Makeshift.find({
        school_id: req.auth.credentials.school_id,
        isDeleted:false

      })
        .lean()
        .exec((err, data) => {
          if (err) {
            console.log(err)
          }
          makeshift_data = data;
          //console.log(data)
          return callback(null);
        })
    },
  ],
    function (callback) {
      reply.view('schoolAd/temporary/temporary.html', {
        temporary_data,
        makeshift_data,
        credentials: req.auth.credentials,
        message: req.query.message,
        alert: req.query.alert,
      });
    }
  )
};
//--------------> temporary add <-------------------------//
internals.temporaryAdd = (req, reply) => {
  Async.series([
    (callback) => {
      var payload = {
        school_id: req.auth.credentials.school_id,
        user_id: req.payload.user_id,
        temporary: req.payload.temporary,
        usetemporary: req.payload.usetemporary,
      }
      // console.log('=======> ', payload);
      var saveMe = new Temporary(payload);
      saveMe.save(function (err, data) {
        if (err) {
          console.log(err);
        }
        console.log(data);
        return callback(null);
      });
    },

  ],
    function (callback) {
      return reply.redirect('/schoolAd/temporary');
    })
};
//---------------------> temporary update <-----------------------//
internals.temporaryUpdate = function (req, reply) {

  Temporary.findOneAndUpdate(
    { _id: req.payload.id },
    { $set: req.payload }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/temporary?message=Temporary successfuly updated&alert=success');
  });
};
//---------------------> temporary delete <-----------------------//
internals.temporaryDelete = function (req, reply) {


  Temporary.findOneAndUpdate(
    { _id: req.payload.del_id },
    { $set: {isDeleted:true} }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/temporary?message=Temporary successfuly updated&alert=success');
  });
};
// -------------makeshift handler add---------------------------//
internals.makeshiftAdd = (req, reply) => {
  Async.series([
    (callback) => {
      var payload = {
        school_id: req.auth.credentials.school_id,
        user_id: req.payload.user_id,
        makeshift: req.payload.makeshift,
        useMakeshift: req.payload.useMakeshift,
      }
      console.log('=======> ', payload);
      var saveMe = new Makeshift(payload);
      saveMe.save(function (err, data) {
        if (err) {
          console.log(err);
        }
        console.log(data);
        return callback(null);
      });
    },

  ],
    function (callback) {
      return reply.redirect('/schoolAd/temporary');
    })
};
//---------------------> makeshift update <-----------------------//
internals.makeshiftUpdate = function (req, reply) {
  // console.log("---------------<>>>>>>>", req.payload.make_id),
  Makeshift.findOneAndUpdate(
    { _id: req.payload.make_id },
    { $set: req.payload }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/temporary?message=MakeShift successfuly updated&alert=success');
  });
};
//---------------------> makeshift delete <-----------------------//
internals.makeshiftDelete = function (req, reply) {


  Makeshift.findOneAndUpdate(
    { _id: req.payload.makesh_id },
    { $set: {isDeleted:true} }
  ).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    return reply.redirect('/schoolAd/temporary?message=Temporary successfuly updated&alert=success');
  });
};
// internals.accessAdd = (req, reply) => {
//   Async.series([
//     (callback) => {
//       var payload = {
//         school_id: req.auth.credentials.school_id,
//         user_id: req.payload.user_id,
//         roadType: req.payload.roadType,
//         transportation: req.payload.transportation,
//       }
//       console.log('=======> ', payload);
//       var saveMe = new Access(payload);
//       saveMe.save(function (err, data) {
//         if (err) {
//           console.log(err);
//         }
//         console.log(data);
//         return callback(null);
//       });
//     },

//   ],
//     function (callback) {
//       return reply.redirect('/schoolAd/temporary');
//     })
// };
module.exports = internals;
