/* eslint-disable global-require */
const testFolder = './test';
const fs = require('fs');
require('dotenv').config();

fs.readdir(testFolder, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      // eslint-disable-next-line import/no-dynamic-require
      require(`./${file}`);
    });
  }
});
