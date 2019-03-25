require('dotenv').config();
const { MongoClient } = require('mongodb');

const connect = url => MongoClient.connect(url, { useNewUrlParser: true, poolSize: 5 })
  .then(client => client.db())
  .catch((connectionError) => {
    throw connectionError;
  });

module.exports = async () => {
  const databases = await Promise.all([
    connect(process.env.DATABASE_URL),
    connect(process.env.TEST_DATABASE_URL),
  ]);

  return {
    production: databases[0],
    test: databases[1],
  };
};

// con().then(dbs => dbs.test
//   .collection('admins')
//   .find({})
//   .toArray((err, docs) => {
//     console.log(docs);
//   }));
