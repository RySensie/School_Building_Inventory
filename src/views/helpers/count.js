var count;

count = function (data) {
  if (data) {
    return data.length.toLocaleString("en-US");
  } else {
    return 0;
  }
};

module.exports = count;
