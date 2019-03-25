const connection = require('../../db_connection');

const insertRequest = requestInformation => new Promise((resolve, reject) => {
  connection().then((dbs) => {
    const database = dbs.production;
    database
      .collection('requests')
      .insertOne(requestInformation)
      .then(() => resolve({ msg: 'Request added sucssfully' }))
      .catch(error => reject(error));
  });
});

module.exports = {
  insertRequest,
};
