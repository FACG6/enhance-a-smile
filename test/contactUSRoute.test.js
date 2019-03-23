const test = require('tape');
const request = require('supertest');
const app = require('../src/app');

test('post in /contact-us (with valid data)', (t) => {
  request(app)
    .post('/contact-us')
    .send({
      email: 'amin@gmail.com',
      fullName: 'aminking',
      message: 'i need help,there is some error in donate',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(
          JSON.parse(res.text).msg.includes('done'),
          true,
          'add massage by contact us sucssfully',
        );
        t.end();
      }
    });
});

test('post in /contact-us (with Not valid data)', (t) => {
  request(app)
    .post('/contact-us')
    .send({
      email: 'amin',
      fullName: '',
      message: 'i need help,there is some error in donate',
    })
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(
          JSON.parse(res.text).msg.includes('inputs not validate'),
          true,
          'add massage by contact us Not sucssfully',
        );
        t.end();
      }
    });
});

test.onFinish(() => process.exit(0));
