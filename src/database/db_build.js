const connection = require('./db_connection.js');

const runDatabaseBuild = () => {
  connection().then((dbs) => {
    const { database } = dbs;
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

    database.collection('admins').insertMany([
      {
        full_name: 'Amin King',
        email: 'amin@gmail.com',
        password: '$2a$08$UScJCp.8EzjH24297R4r2eoarSyI7ZbvSMkrnEjlJ4seeduxJbilC',
      },
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

    database
      .collection('registers')
      .insertMany([{ email: 'ahmed@gmail.com' }, { email: 'amin@gmail.com' }]);

    setTimeout(() => {
      console.log('Database was built successfully');
      process.exit(0);
    }, 10000);
  });
};

runDatabaseBuild();

module.exports = { runDatabaseBuild };
