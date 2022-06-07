var momentjs = require("moment");

var calendar;

calendar = function (date) {
  return momentjs(date).calendar();
};

module.exports = calendar;
