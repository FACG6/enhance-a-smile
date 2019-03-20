const client = require('./db_connection.js');

const runDatabaseBuild = () => {
  client.connect((connectionError) => {
    if (connectionError) throw connectionError;
    const database = client.db('enhance-a-smile-db');
    const collections = [
      'admins',
      'donates',
      'requests',
      'help-others',
      'registers',
      'contacts',
      'visits',
    ];

    collections.forEach((collection) => {
      database.collection(collection).deleteMany({});
    });

    database.collection('admins').insertMany([
      {
        full_name: 'Ahmed Abdellatif',
        email: 'ahmed@gmail.com',
        password: '123',
      },
      {
        full_name: 'Abdallah Ammar',
        email: 'abdallah@gmail.com',
        password: '123',
      },
    ]);

    database
      .collection('registers')
      .insertMany([{ email: 'ahmed@gmail.com' }, { email: 'amin@gmail.com' }]);

    client.close();
  });
};

runDatabaseBuild();
