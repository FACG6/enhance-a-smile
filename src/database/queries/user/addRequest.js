const client = require('../../db_connection');

const insertRequest = requestInformation => new Promise((resolve, reject) => {
  client.connect((error) => {
    if (error) reject(error);
    const database = client.db('enhance-a-smile-db');
    database
      .collection('requests')
      .insertOne(requestInformation);
    // .catch(err => console.log('err', err));
    resolve({ msg: 'Request added sucssfully' });
    client.close();
  });
});

module.exports = {
  insertRequest,
};
