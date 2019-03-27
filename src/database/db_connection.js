require('dotenv').config();
const { MongoClient } = require('mongodb');

const connect = url => MongoClient.connect(url, { useNewUrlParser: true, poolSize: 5 })
  .then(client => client.db())
  .catch((connectionError) => {
    throw connectionError;
  });

let DB_URL = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'test') DB_URL = process.env.TEST_DATABASE_URL;
if (!DB_URL) throw new Error('Database Url must be set');

module.exports = async () => {
  const databases = await Promise.all([connect(DB_URL)]);

  return {
    database: databases[0],
  };
};
