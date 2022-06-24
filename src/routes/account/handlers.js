"use strict";


const  Hidden = require('../../database/models/hidden');
const Schools = require('../../database/models/school');
const Users = require('../../database/models/users');
var internals = {},
  Crypto = require('../../lib/Crypto'),
  _ = require('lodash'),
  moment = require('moment');
var Sharp = require('sharp');
var Async = require('async');

internals.index = function (req, reply) {
  if (req.auth.isAuthenticated) {
    if (req.auth.credentials.scope[0] === 'admin') {
      return reply.redirect('/admin/dashboard');
    } else if (req.auth.credentials.scope[0] === 'schoolAd') {
      return reply.redirect('/schoolAd/dashboard');
    }
  } else {
    reply.view('accounts/login.html', {
      message: req.query.message,
      alert: req.query.alert,
    });
  }
};

internals.login = function (req, reply) {
  req.cookieAuth.clear();
  reply.view('accounts/login.html', {
    message: req.query.message,
    alert: req.query.alert,
  });
};

internals.logout = function (req, reply) {
  req.cookieAuth.clear();
  return reply.redirect('/login');
};
// Web Authentication
internals.web_authentication = async function (req, reply) {
  try {
    let message = "";
    const { email, password } = req.payload;
    const encryptedPassword = Crypto.encrypt(password);
    let user = await Users.findOne({ email }).lean();

    if (!user || user.isVoid) {
      message = "Account does not exist.";
      return reply.redirect(`/login?message=${message}&alertType=danger`);
    }
    if (user.password != encryptedPassword) {
      message = "Incorrect password.";
      return reply.redirect(`/login?message=${message}&alertType=danger`);
    }
    if (user.isConfirm == false) {
      message = "User need to be confirmed!"
      return reply.redirect(`/login?message=${message}&alertType=danger`);
    }
    // Redirect user based on their scope
    switch (user.scope[0]) {
      // * To admin
      case "admin": {
        req.cookieAuth.set(user);
        return reply.redirect("/admin/dashboard");
      }
      // * school Administratiom
      case "schoolAd": {
        const schools = await Schools.findOne({_id: user.school_id}).lean();
        user.school_profile = schools.logo_img;
        user.school_name = schools.schoolName;
        user.school_ID = schools.schoolId;
        req.cookieAuth.set(user);
        return reply.redirect("/schoolAd/dashboard");
      }
      default: {
        req.cookieAuth.clear();
        message = "Authentication failed! No account found 3.";
        return reply.redirect(`/login?message=${message}&alertType=danger`);
      }
    }
  } catch (err) {
    reply.redirect("/login?message=Internal error!&alertType=danger");
  }
};

// Logout
internals.logout = function (req, reply) {
  req.cookieAuth.clear();
  return reply.redirect('/login');
};
//signup
// internals.signup = function (req, reply) {
//   reply.view('accounts/register.html', {
//     message: req.query.message,
//     alert: req.query.alert,
//   });
// };
internals.signup = function (req, reply) {

  var list_data = {};
  Async.series([
    function (callback) {
      Hidden.find({
      })
        .lean()
        .exec((err, data) => {
          if (err) {
            // console.log(err)
          }
          list_data = data;
          // console.log(data)
          return callback(null);
        })
    },
  ],
    function (callback) {
      reply.view('accounts/register.html', {
        list_data,
        message: req.query.message,
        alert: req.query.alert,
      });
    }
  )
};
internals.createAccount = async (req, reply) => {


  try {
    // TODO: Send password copy to driver's email
    // const password = crypto.randomBytes(4).toString("hex");
    const password = Crypto.encrypt(req.payload.password);
    const data = {
      school_id: req.payload.school_id,
      schoolName: req.payload.schoolName,
      address: req.payload.address,
      schoolId: req.payload.schoolId,
      firstname: req.payload.firstname,
      lastname: req.payload.lastname,
      email: req.payload.email,
      password: password,
    };
    // console.log("------>?", data);
    const {_id} = await Schools.create({ schoolName: data.schoolName, schoolId: data.schoolId, address: data.address });
    const user = await Users.create({ school_id: _id, firstname: data.firstname, lastname: data.lastname, email: data.email, password: data.password, scope: ['schoolAd'] });
    
    var checkUploads = uploadLogo(req.payload.logo, _id);
    var checkUpload = uploadProfilePicture(req.payload.image, user._id);
      return reply.redirect("/login?message=Successfully Created!&alertType=success");

  } catch (err) {
    // console.log("errrrrror", err)  
    reply.redirect("/signup?message=Problem occured 2!&alertType=danger");
  }
};

const uploadProfilePicture = async function (payload_image, user_id) {

  var base64Image =payload_image;
  var storagelink = "src/assets/uploads/PROFILE/" + user_id;
  var linkProfile = "/assets/uploads/PROFILE/" +  user_id;
  var ext = ".jpeg";
 
  await Sharp(base64Image)
  .rotate()
  .resize({
      width: 500,
      height: 500,
      fit: Sharp.fit.cover,
  })
  .toFile(storagelink + ext)
  .then(async (data) => {
       console.log(data);

      //CHANGE PROFILE PIC LINK
      const payload = {
        profile_img: linkProfile + ext,
      }
      await Users.findOneAndUpdate(
        {
          _id: user_id
        },
        {
          $set: payload,
        },
        function (err, data) {
          if (err) {
            console.log(err);
          }

            console.log(data)
           
            return true;
          
        },
      );
  })
  .catch((error) => {
      // error handeling
      console.log('ERROR: ',error);
      return false;
  });
};
const uploadLogo = async function (payload_image, school_id) {

  var base64Image =payload_image;
  var storagelink = "src/assets/uploads/LOGO/" + school_id;
  var linkProfile = "/assets/uploads/LOGO/" +  school_id;
  var ext = ".jpeg";
 
  await Sharp(base64Image)
  .rotate()
  .resize({
      width: 500,
      height: 500,
      fit: Sharp.fit.cover,
  })
  .toFile(storagelink + ext)
  .then(async (data) => {
       console.log(data);

      //CHANGE PROFILE PIC LINK
      const payload = {
        logo_img: linkProfile + ext,
      }
      await Schools.findOneAndUpdate(
        {
          _id: school_id
        },
        {
          $set: payload,
        },
        function (err, data) {
          if (err) {
            console.log(err);
          }

            console.log(data)
           
            return true;
          
        },
      );
  })
  .catch((error) => {
      // error handeling
      console.log('ERROR: ',error);
      return false;
  });
};
module.exports = internals;
