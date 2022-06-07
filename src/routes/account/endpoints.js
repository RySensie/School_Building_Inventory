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
    path: '/',
    handler: Handlers.index,
    config: {
      auth: {
        strategy: 'standard',
      },
    },
  },
  {
    method: ['GET'],
    path: '/login',
    handler: Handlers.login,
    config: {
      description: 'Show login page',
      tags: ['api']
    }
  },
  {
    method: ['POST'],
    path: '/web/authentication',
    handler: Handlers.web_authentication,
    config: {
      description: 'Authentication',
      tags: ['api']
    }
  },
  {
    method: ['GET'],
    path: '/logout',
    handler: Handlers.logout,
    config: {
      description: 'Logout user',
      tags: ['api']
    }
  },
  {
    method: ['GET'],
    path: '/register',
    handler: Handlers.signup,
  },
  {
    method: ['POST'],
    path: '/signup',
    handler: Handlers.createAccount,
    config: {
    },
  }
]

module.exports = internals;
