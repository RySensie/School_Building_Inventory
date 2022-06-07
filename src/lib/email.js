'use strict';

var Async = require('async');
const Nodemailer = require('nodemailer');

exports.sendEmail = async function (email, content) {
    let transporters = Nodemailer.createTransport({
      host: 'in-v3.mailjet.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "60b13cb629e4fe94c85d664758e66a28",
        pass: "abc0255e398d171bf20dae7d42833aba",
      },
    });
    let mailOptions = {
      from: "schoolbuildinginventory@gmail.com",
      to: email,
      subject:"School Building Inventory",
      text: content,
    }
    return transporters.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };