const test = require('tape');
const request = require('supertest');
const app = require('../src/app');

test('post in /register (with valid email)', (t) => {
  request(app)
    .post('/register')
    .send({
      email: 'amin@gmail.com',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(
          JSON.parse(res.text).msg.msg.includes('inserted sucssfully'),
          true,
          'add email sucssfully',
        );
        t.end();
      }
    });
});

test('post in /register (with Not valid email)', (t) => {
  request(app)
    .post('/register')
    .send({
      email: 'amin',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(
          JSON.parse(res.text).msg.includes('email not validate'),
          true,
          'Add public post fialed',
        );
        t.end();
      }
    });
});

test.onFinish(() => process.exit(0));
