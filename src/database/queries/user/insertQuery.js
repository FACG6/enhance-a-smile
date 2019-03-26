const connection = require('../../db_connection');

module.exports = (collectionName, objData) => new Promise((resolve, reject) => {
  connection().then((dbs) => {
    const database = dbs.production;
    database
      .collection(collectionName)
      .insertOne(objData)
      .then(() => {
        resolve({ msg: 'inserted sucssfully' });
      })
      .catch((err) => {
        reject(err);
      });
  });
});
