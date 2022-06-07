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
  path: '/schoolAd/building/buildingWSF/{building_id}',
  handler: Handlers.buildingWSF,
  config: {
    auth: {
      strategy: 'standard',
      scope: ['schoolAd']
    },
  },
},
{
  method: ['POST'],
  path: '/schoolAd/buildingWSF/add/{building_id}',
  handler: Handlers.buildingWSF_add,
  config: {
    auth: {
      strategy: 'standard',
      scope: ['schoolAd']
    },
  },
},
{
  method: ['POST'],
  path: '/schoolAd/buildingWSF/update/{building_id}',
  handler: Handlers.buildingWSFUpdate,
  config: {
    auth: {
      strategy: 'standard',
      scope: ['schoolAd']
    },
  },
},
]

module.exports = internals;
