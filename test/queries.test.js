const test = require('tape');
const insertEmailRegister = require('../src/database/queries/user/insertQuery');

test('test insert query for registers collection', (t) => {
  const email = { email: 'mail.com' };
  insertEmailRegister('registers', email)
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

test.onFinish(() => process.exit(0));
