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
    path: '/schoolAd/room/{building_id}',
    handler: Handlers.room,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/room/add/{building_id}',
    handler: Handlers.roomAdd,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
      description: 'schoolAdmin add or create room',
      tags: ['api'],
      payload: {
        maxBytes: 20000000,
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/room/update/{building_id}',
    handler: Handlers.roomUpdate,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
      description: 'schoolAdmin update room',
      tags: ['api'],
      payload: {
        maxBytes: 20000000,
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/room/conditionUpdate/{building_id}',
    handler: Handlers.conditionUpdate,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/room/delete/{building_id}',
    handler: Handlers.roomDelete,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },

]

module.exports = internals;
