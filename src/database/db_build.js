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

>>>>>>> 49ffb55cc99ee2afaf5bbcb57e622a27fa2ae406
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
>>>>>>> 49ffb55cc99ee2afaf5bbcb57e622a27fa2ae406

    client
      .close()
      .then(() => console.log('done build'))
      .catch(() => console.log('error in build'));
  });
};

runDatabaseBuild();

module.exports = { runDatabaseBuild };
