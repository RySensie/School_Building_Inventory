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
    path: '/schoolAd/dashboard',
    handler: Handlers.dashboard,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/reqNew',
    handler: Handlers.requestNew,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/buildReq',
    handler: Handlers.requestBUILD,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/roomReq',
    handler: Handlers.requestRoom,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
]

module.exports = internals;
