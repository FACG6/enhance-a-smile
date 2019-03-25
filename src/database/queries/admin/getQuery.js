const client = require('../../db_connection');

module.exports = (collectionName, obj) => new Promise((resolve, reject) => {
  client.connect((error) => {
    if (error) reject(error);
    const dataBase = client.db('enhance-a-smile-db');
    dataBase
      .collection(collectionName)
      .find(obj).toArray()
      .then((res) => {
        client.close();
        resolve(res);
      })
      .catch((err) => {
        client.close();
        reject(err);
      });
  });
});
