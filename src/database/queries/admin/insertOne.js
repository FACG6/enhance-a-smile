const { ObjectId } = require('mongodb');
const connection = require('../../db_connection');

module.exports = (collectionName, id, obj) => new Promise((resolve, reject) => {
  connection().then((dbs) => {
    const dataBase = dbs.database;
    dataBase
      .collection(collectionName)
      .findOneAndUpdate({
        _id: ObjectId(id),
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
