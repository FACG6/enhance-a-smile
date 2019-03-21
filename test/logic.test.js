const test = require('tape');
const { validateEamil } = require('./../public/js/validation');

test('test Funaction for validation email(wrong email)', (t) => {
  t.equal(validateEamil('amin'), false, 'email not validate');
  t.end();
});

test('test Funaction for validation email(correct email)', (t) => {
  t.equal(validateEamil('amin@gmail.com'), true, 'email validate');
  t.end();
});
