const connection = require('../../db_connection');

module.exports = (collectionName, name, obj) => new Promise((resolve, reject) => {
  connection().then((dbs) => {
    const dataBase = dbs.production;
    dataBase
      .collection(collectionName)
      .findOneAndUpdate({
        full_name: name,
      }, {
        $set: obj,
      }, {
        returnNewDocument: true,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
});
