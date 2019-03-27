const test = require('tape');
const getQuery = require('../src/database/queries/admin/getQuery');

test('test for getQuery to get data from database', (t) => {
  const expected = 'hamod';

  getQuery('admins', { full_name: 'hamod' }).then((res) => {
    t.equal(expected, res[0].full_name, 'test of query of get data is done');
    t.end();
  });
});
