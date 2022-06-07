'use strict';
/**
 * ## Imports
 *
 */
//Handle the endpoints
var Handlers = require('./handlers'),
  Joi = require('joi'),
  internals = {};

internals.endpoints = [
  {
    method: 'GET',
    path: '/account/check/duplicate/employeeid/{_id}',
    handler: Handlers.check_duplicate_employeeid,
    config: {
      validate: {
        params: {
          _id: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/account/check/duplicate/email/{email}',
    handler: Handlers.check_duplicate_email,
    config: {
      validate: {
        params: {
          email: Joi.string().required(),
        },
      },
      description: 'Login in',
      tags: ['api'],
    },
  },
  {
    method: 'GET',
    path: '/verify/email/sendCode/{scope}/{email}',
    handler: Handlers.mailer_gmail_send_code,
    config: {
      validate: {
        params: {
          scope: Joi.string().required(),
          email: Joi.string().required(),
        },
      },
      description: 'Login in',
      tags: ['api'],
    },
  },
  {
    method: ['GET'],
    path: '/users/helpers/vaccinationsite',
    handler: Handlers.vaccinationsite,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['user'],
      },
    },
  },
];

module.exports = internals;
