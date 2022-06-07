'use strict';

var AuthRoutes = require('../routes/auth/endpoints'),
//account routes
    AccountRoutes = require('../routes/account/endpoints'),
//helpers routes
    HelperRoutes = require('../routes/helpers/endpoints'),
//admin routes
    AdminRoutes = require('../routes/admin/dashboard/endpoints'),
    AdminPeopleRoutes = require('../routes/admin/people/endpoints'),
    AdminSchoolRoutes = require('../routes/admin/school/endpoints'),
    AdminHiddenRoutes = require('../routes/admin/hidden/endpoints'),
    
//school administrator routes
    SchoolAdRoutes = require('../routes/schoolAd/dashboard/endpoints'),
    SchoolAdBuildingRoutes = require('../routes/schoolAd/building/endpoints'),
    SchoolAdBuildingWSFRoutes = require('../routes/schoolAd/buildingWSF/endpoints'),
    SchoolAdRoomRoutes = require('../routes/schoolAd/room/endpoints'),
    SchoolAdFacilityRoutes = require('../routes/schoolAd/facility/endpoints'),
    SchoolAdStudentRoutes = require('../routes/schoolAd/student/endpoints'),
    SchoolAdStandAloneRoutes = require('../routes/schoolAd/stand-aloneWSF/endpoints'),
    SchoolAdFurnitureRoutes = require('../routes/schoolAd/furniture/endpoints'),
    SchoolAdProfileRoutes = require('../routes/schoolAd/profile/endpoints'),
    SchoolAdTransRoutes = require('../routes/schoolAd/access/endpoints'),
    SchoolAdRequestRoutes = require('../routes/schoolAd/request/endpoints'),
    SchoolAdTempRoutes = require('../routes/schoolAd/temporary/endpoints')

  ;

var internals = {};

//Concatentate the routes into one array
internals.routes = [].concat(
  AuthRoutes.endpoints,
  AccountRoutes.endpoints,
  HelperRoutes.endpoints,
  //
  AdminRoutes.endpoints,
  AdminPeopleRoutes .endpoints,
  AdminSchoolRoutes.endpoints,
  AdminHiddenRoutes.endpoints,

//School Admin Routes
  SchoolAdRoutes.endpoints,
  SchoolAdBuildingRoutes.endpoints,
  SchoolAdBuildingWSFRoutes.endpoints,
  SchoolAdRoomRoutes.endpoints,
  SchoolAdFacilityRoutes.endpoints,
  SchoolAdStudentRoutes.endpoints,
  SchoolAdStandAloneRoutes.endpoints,
  SchoolAdFurnitureRoutes.endpoints,
  SchoolAdProfileRoutes.endpoints,
  SchoolAdTransRoutes.endpoints,
  SchoolAdRequestRoutes.endpoints,
  SchoolAdTempRoutes.endpoints


  

);

//set the routes for the server
internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
