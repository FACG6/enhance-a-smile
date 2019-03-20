require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

module.exports = client;
