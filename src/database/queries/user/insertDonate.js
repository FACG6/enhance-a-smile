const client = require('../../db_connection');

const insertDonation = donateInfo => new Promise((resolve, reject) => {
  client.connect((error) => {
    if (error) reject(error);
    const database = client.db('enhance-a-smile-db');
    database.collection('donates').insertOne(donateInfo);
    resolve({ msg: 'donate added sucssfully' });
    client.close();
  });
});

module.exports = insertDonation;
