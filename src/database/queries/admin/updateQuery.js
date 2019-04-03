const { ObjectId } = require('mongodb');
const connection = require('../../db_connection');

module.exports = (collectionName, id, newstatus) => new Promise((resolve, reject) => {
  connection().then((dbs) => {
    const dataBase = dbs.database;
    dataBase
      .collection(collectionName)
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: { status: newstatus },
        },
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
});
