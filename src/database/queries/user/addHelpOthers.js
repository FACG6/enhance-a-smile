const client = require('./../../db_connection.js');

module.exports = obj => new Promise((resolve, reject) => {
  client.connect((connectionError) => {
    if (connectionError) reject(connectionError);
    client
      .db('enhance-a-smile-db')
      .collection('help-others')
      .insertOne(obj)
      .then((res) => {
        resolve(res);
        client.close();
      })
      .catch((err) => {
        reject(err);
        client.close();
      });
  });
});
