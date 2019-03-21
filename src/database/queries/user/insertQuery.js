const client = require('../../db_connection');

const insertQuery = (collectionName, objData) => new Promise((resolve, reject) => {
  client.connect((error) => {
    if (error) reject(error);
    const database = client.db('enhance-a-smile-db');
    database
      .collection(collectionName)
      .insertOne(objData)
      .then(() => {
        resolve({ msg: 'inserted sucssfully' });
        client.close();
      })
      .catch((err) => {
        reject(err);
        client.close();
      });
  });
});

module.exports = insertQuery;
