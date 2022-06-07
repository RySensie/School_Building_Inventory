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
    path: '/admin/school',
    handler: Handlers.adminSchool,
    config: {
      auth: {
        strategy: "standard",
        scope: ["admin"],
      },
    },
  },
  // {
  //   method: ['POST'],
  //   path: '/admin/school/create',
  //   handler: Handlers.adminCreateSchool,
  //   config: {
  //     auth: {
  //       strategy: "standard",
  //       scope: ["admin"],
  //     },
  //   },
  // },
  {
    method: ['GET'],
    path: '/admin/school/details/{id}',
    handler: Handlers.adminSchoolDt,
    config: {
      auth: {
        strategy: "standard",
        scope: ["admin"],
      },
    },
  },
]

module.exports = internals;