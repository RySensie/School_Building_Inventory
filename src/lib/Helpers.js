'use strict';

var Async = require('async');
var Crypto = require('../../lib/Crypto');

exports.timeToSeconds = function (time) {
  var seconds = 0;
  var split = time.split(':');
  seconds = seconds + parseInt(split[0]) * 3600;
  seconds = seconds + parseInt(split[1]) * 60;
  seconds = parseInt(split[2]) ? seconds + parseInt(split[2]) : seconds;
  return seconds;
};

var toSeconds = function (time) {
  var seconds = 0;
  var split = time.split(':');
  seconds = seconds + parseInt(split[0]) * 3600;
  seconds = seconds + parseInt(split[1]) * 60;
  seconds = parseInt(split[2]) ? seconds + parseInt(split[2]) : seconds;
  return seconds;
};

exports.grossPay = function (data) {
  var response = {};
  var summary = data;
  var count = 0;
  var grossFrom = '';
  var dailygross = 0;
  var grossTotal = 0;
  var time_start = 0;
  var time_end = 0;
  var find_time_out;
  var mode;
  var base_pay_amount = 0;
  var daily_time_in_seconds = 0;
  Async.series([
    function (callback) {
      Async.during(
        function (callback) {
          return callback(null, count < summary.length);
        },
        function (callback) {
          dailygross = 0;
          daily_time_in_seconds = 0;
          grossFrom = summary[count]._id;
          for (var i = 0; i < summary[count].list.length; i++) {
            var split = summary[count].list[i].mode.split('_');
            if (split[1] === 'in') {
              var gross = 0;
              console.log(summary[count].list[i].base_pay_time);
              base_pay_amount = summary[count].list[i].base_pay_amount;
              console.log('base_pay_amount', base_pay_amount);
              time_start = toSeconds(summary[count].list[i].base_pay_time);
              console.log('time_start', time_start);
              find_time_out = split[0] + '_' + 'out';
              for (var x = 0; x < summary[count].list.length; x++) {
                mode = summary[count].list[x].mode;
                if (mode === find_time_out) {
                  console.log(summary[count].list[x].base_pay_time);
                  time_end = toSeconds(summary[count].list[x].base_pay_time);
                  console.log('time_end', time_end);
                  var totalSeconds = time_end - time_start;
                  var base_pay_per_second = base_pay_amount / 60 / 60;
                  gross = totalSeconds * base_pay_per_second;
                  daily_time_in_seconds = daily_time_in_seconds + totalSeconds;
                  console.log('totalSeconds', totalSeconds);
                  console.log('hours', totalSeconds / 60 / 60);
                  console.log('gross', gross);
                  summary[count].list[x].gross = gross;
                  summary[count].list[x].seconds = totalSeconds;
                  dailygross = dailygross + gross;
                }
              }
            }
          }

          summary[count].gross = dailygross;
          summary[count].basepay = base_pay_amount;
          summary[count].seconds = daily_time_in_seconds;
          grossTotal = grossTotal + dailygross;
          count++;
          setTimeout(callback, 0);
        },
        function (err) {
          console.dir(summary, { depth: null });
          return callback(null);
        }
      );
    },
    function (callback) {
      response = {
        grossTotal,
        grossFrom,
        summary,
      };
      return response;
    },
  ]);
};
