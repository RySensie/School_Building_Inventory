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
    path: '/schoolAd/building',
    handler: Handlers.buildings,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['GET'],
    path: '/schoolAd/building/add',
    handler: Handlers.createAdd,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/building/add',
    handler: Handlers.add,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['GET'],
    path: '/schoolAd/building/Details/{id}',
    handler: Handlers.buildingDetails,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/building/update',
    handler: Handlers.buildingUpdate,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/building/delete',
    handler: Handlers.buildingDelete,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
]

module.exports = internals;
