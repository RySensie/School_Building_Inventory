'use strict';

var internals = {},
  Crypto = require('crypto'),
  Users = require('../../database/models/users'),
  EmailCode = require('../../database/models/users'),
  _ = require('lodash'),
  Nodemailer = require('nodemailer');

var transporter = Nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'hrmis.algotechph@gmail.com',
    pass: '@Longlivealgotech2017',
  },
});

internals.check_duplicate_employeeid = function (req, reply) {
  let id = req.params._id.toUpperCase();
  Users.findOne({ employeeid: id }, '', { lean: true }, function (err, user) {
    if (_.isNull(user)) {
      reply(false);
    } else {
      reply(true);
    }
  });
};

internals.check_duplicate_email = function (req, reply) {
  Users.findOne(
    { email: req.params.email },
    '',
    { lean: true },
    function (err, user) {
      if (_.isNull(user)) {
        reply(false);
      } else {
        reply(true);
      }
    }
  );
};

internals.mailer_gmail_send_code = function (req, reply) {
  var finalPayload = {};
  finalPayload.code = parseInt(Crypto.randomBytes(2).toString('hex'), 16);
  finalPayload.email = req.params.email;
  finalPayload.scope = req.params.scope;
  var code = new EmailCode(finalPayload);
  code.save(function (err, user) {
    if (err) {
      reply(Boom.conflict(err));
    } else {
      var mailOptions = {
        from: 'hrmis.algotechph@gmail.com',
        to: finalPayload.email,
        subject: 'HRMIS',
        text: 'Your HRMIS verification code: ' + finalPayload.code,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          reply({
            success: true,
          });
        }
      });
    }
  });
};

internals.verifyEmail = function (req, reply) {
  EmailCode.findOne(
    { email: req.payload.email },
    '',
    { lean: true, sort: { createdAt: -1 } },
    function (err, res) {
      var Code = res;
      console.log('Code', Code);
      if (_.isNull(res)) {
        return reply.redirect(
          '/' +
            Code.scope +
            '/profile?message=Invalid Verification Code!&alertType=warning'
        );
      } else {
        if (Code.code === req.payload.code) {
          Users.findOneAndUpdate(
            { email: req.payload.email },
            { $set: { isVerified: true } },
            function (err, user) {
              if (err) {
                console.log(err);
              } else {
                return reply.redirect(
                  '/' +
                    Code.scope +
                    '/profile?message=Account Verified!&alertType=success'
                );
              }
            }
          );
        } else {
          return reply.redirect(
            '/' +
              Code.scope +
              '/profile?message=Invalid Verification Code!&alertType=warning'
          );
        }
      }
    }
  );
};

internals.vaccinationsite = function (req, reply) {
  var mongoose = require('mongoose');

  var re = new RegExp(req.query.keyword, 'i');
  Users.find({
    $and: [
      {
        name: { $regex: re },
      },
      { scope: 'vaccination' },
    ],
  })
    .lean()
    .limit(20)
    .exec(function (err, result) {
      if (err) {
        return reply(Boom.badData('Internal MongoDB error', err));
      } else {
        return reply(result);
      }
    });
};

module.exports = internals;
