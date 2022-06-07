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
    path: '/admin/hidden',
    handler: Handlers.hidden,
  },
  {
    method: ['POST'],
    path: '/admin/hidden',
    handler: Handlers.addhidden,
  },
]

module.exports = internals;