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
    path: '/schoolAd/temporary',
    handler: Handlers.temporary,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },  
  },
  {
    method: ['POST'],
    path: '/schoolAd/temporary',
    handler: Handlers.temporaryAdd,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },  
  },
  {
    method: ['POST'],
    path: '/schoolAd/temporary/update',
    handler: Handlers.temporaryUpdate,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/temporary/delete',
    handler: Handlers.temporaryDelete,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/makeshift',
    handler: Handlers.makeshiftAdd,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },  
  },
  {
    method: ['POST'],
    path: '/schoolAd/makeshift/update',
    handler: Handlers.makeshiftUpdate,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
  {
    method: ['POST'],
    path: '/schoolAd/makeshift/delete',
    handler: Handlers.makeshiftDelete,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['schoolAd']
      },
    },
  },
]

module.exports = internals;
