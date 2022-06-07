var duration;
var momentjs = require("moment");

duration = function (start, end) {
  var a = momentjs(end);//now
  var b = momentjs(start);

  return a.diff(b, 'minutes');
};

module.exports = duration;
