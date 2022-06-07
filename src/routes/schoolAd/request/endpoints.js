'use strict';
/**
 * ## Imports
 *
 */
//Handle the endpoints
var Handlers = require('./handlers'),
  internals = {};

internals.endpoints = [
  // {
  //   method: ['GET'],
  //   path: '/schoolAd/request',
  //   handler: Handlers.request,
  //   config: {
  //     auth: {
  //       strategy: 'standard',
  //       scope: ['schoolAd']
  //     },
  //   },
  // },
  {
    method: ['POST'],
    path: '/schoolAd/request',
    handler: Handlers.requestAdd,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
]

module.exports = internals;
