const connection = require('../../db_connection');

module.exports = (collectionName, obj) => new Promise((resolve, reject) => {
  connection((dbs) => {
    const dataBase = dbs.production;
    dataBase
      .collection(collectionName)
      .find(obj)
      .toArray()
      .then((res) => {
        console.log('saddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwdddddd');
        resolve(res);
      })
      .catch((err) => {
        console.log('szzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzddd');
        reject(err);
      });
  });
});
