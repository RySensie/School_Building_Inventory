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
    path: '/schoolAd/facility',
    handler: Handlers.facility,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },  
  },
  {
    method: ['POST'],
    path: '/schoolAd/facility/add',
    handler: Handlers.addFacility,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },  
  },
  {
    method: ['POST'],
    path: '/schoolAd/facility/update',
    handler: Handlers.facilityUpdate,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/facility/delete',
    handler: Handlers.facilityDelete,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  }
]

module.exports = internals;
