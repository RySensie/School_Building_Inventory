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
    path: '/admin/dashboard',
    handler: Handlers.adminDashboard,
    config: {
      auth: {
        strategy: 'standard',
      },
    },
  },

]

module.exports = internals;