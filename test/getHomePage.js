const test = require('tape');
const request = require('supertest');
const app = require('../src/app');

test('get in /donate (donate page)', (t) => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.text.includes('Enhance A Smile'), true, 'get donate page sucsesfully');
        t.end();
      }
    });
});

test.onFinish(() => process.exit(0));
