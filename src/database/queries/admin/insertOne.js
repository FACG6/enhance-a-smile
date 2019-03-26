const client = require('./../../db_connection');
const { ObjectId } = require('mongodb');

module.exports = (collectionName, id, obj) => new Promise((resolve, reject) => {
  client.connect((error) => {
    if (error) reject(error);
    const database = client.db('enhance-a-smile-db');
    database
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
        client.close();
        reject(err);
      });
  });
});
