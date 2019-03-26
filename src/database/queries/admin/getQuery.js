const connection = require('../../db_connection');

module.exports = (collectionName, obj) => new Promise((resolve, reject) => {
  connection().then((dbs) => {
    const dataBase = dbs.production;
    dataBase
      .collection(collectionName)
      .find(obj)
      .toArray()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
});
