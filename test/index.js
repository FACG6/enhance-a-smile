/* eslint-disable global-require */
const testFolder = './test';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  files.forEach((file) => {
    if (file !== 'testRoutes.js') {
      // eslint-disable-next-line import/no-dynamic-require
      require(`./${file}`);
      console.log(file);
    }
    return false;
  });
});
