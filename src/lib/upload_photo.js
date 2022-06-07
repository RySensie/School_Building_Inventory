'use strict';
var Sharp = require('sharp');

exports.photo = async function (payload_image, folder_name, photo_name) {
  var storagelink = `src/assets/uploads/${folder_name}/${photo_name}.jpeg`;
Sharp(payload_image)
  .rotate()
  .resize({
      width: 500,
      height: 500,
      fit: Sharp.fit.cover,
  })
  .toFile(storagelink)
  .then(async (data) => {
       console.log(data);
      return true;
  })
  .catch((error) => {
      console.log('ERROR: ',error);
      return false;
  });
  };