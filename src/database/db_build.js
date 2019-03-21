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

<<<<<<< HEAD
=======
    database.collection('donates').insertOne({
      fullName: 'abdallah',
      phoneNumber: '0597185554',
      cityName: 'gaza',
      email: 'abodsaid1996@gmail.com',
      numberOfPieces: '15',
      quality: ['very good', 'low'],
      gender: ['men', 'kids'],
      season: ['autum', 'winter'],
    });

>>>>>>> d83a3f2b490aeb3bbc14ea6fcec3e6d13772e7ef
    database.collection('admins').insertMany([
      {
        full_name: 'Ahmed Abdellatif',
        email: 'ahmed@gmail.com',
        password: '$2a$08$UScJCp.8EzjH24297R4r2eoarSyI7ZbvSMkrnEjlJ4seeduxJbilC',
      },
      {
        full_name: 'Abdallah Ammar',
        email: 'abdallah@gmail.com',
        password: '$2a$08$UScJCp.8EzjH24297R4r2eoarSyI7ZbvSMkrnEjlJ4seeduxJbilC',
      },
    ]);

<<<<<<< HEAD
    database
      .collection('registers')
      .insertMany([{ email: 'ahmed@gmail.com' }, { email: 'amin@gmail.com' }]);
=======
    database.collection('registers').insertMany([
      {
        email: 'ahmed@gmail.com',
      },
      {
        email: 'amin@gmail.com',
      },
    ]);
>>>>>>> d83a3f2b490aeb3bbc14ea6fcec3e6d13772e7ef

    client
      .close()
      .then(() => console.log('done build'))
      .catch(() => console.log('error in build'));
  });
};

runDatabaseBuild();

module.exports = { runDatabaseBuild };
