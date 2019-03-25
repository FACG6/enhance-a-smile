const test = require('tape');
const insertQuery = require('../src/database/queries/user/insertQuery');

test('test insert query for registers collection', (t) => {
  const email = { email: 'mail.com' };
  insertQuery('registers', email)
    .then((res) => {
      t.equal(
        res.msg.includes('inserted sucssfully'),
        true,
        'insert email for register query done',
      );
      t.end();
    })
    .catch(err => t.error(err));
});
test('test insert query for requests collection', (t) => {
  const userRequest = {
    'personal-data':
  {
    fullName: 'jamalat',
    phoneNumber: '056983282545',
    cityName: 'gaza',
    streetName: 'eight street',
  },
    'request-data':
   {
     numberOfPieces: '12',
     gender: ['women', 'men'],
     season: ['winter', 'summer'],
     descrption: 't shirts, generally made of cotton.',
   },
  };
  insertQuery('requests', userRequest)
    .then((res) => {
      t.equal(
        res.msg.includes('inserted sucssfully'),
        true,
        'insert userRequest to  requests collection in database is done',
      );
      t.end();
    })
    .catch(err => t.error(err));
});

test.onFinish(() => process.exit(0));
