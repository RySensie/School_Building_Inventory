'use strict';
/**
 * ## Imports
 *
 */
//Handle the endpoints
var Handlers = require('./handlers'),
  internals = {};

internals.endpoints = [
  {
    method: ['GET'],
    path: '/admin/people',
    handler: Handlers.adminUserView,
  },
  // {
  //   method: ['POST'],
  //   path: '/admin/people/create',
  //   handler: Handlers.adminUserCreate,
  // },
  {
    method: ['POST'],
    path: '/admin/people/confirm',
    handler: Handlers.confirmAccount,
  },
]

module.exports = internals;