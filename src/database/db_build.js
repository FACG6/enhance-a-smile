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
        password: '$2a$08$UScJCp.8EzjH24297R4r2eoarSyI7ZbvSMkrnEjlJ4seeduxJbilC',
      },
      {
        full_name: 'Abdallah Ammar',
        email: 'abdallah@gmail.com',
        password: '$2a$08$bW2Pm5ERGNJfxIVgAIyExukAnKcf1idVpuculyzFNRpzTGP5r6qg2',
      },
    ]);

    database
      .collection('registers')
      .insertMany([{ email: 'ahmed@gmail.com' }, { email: 'amin@gmail.com' }]);

    client.close();
  });
};

runDatabaseBuild();
