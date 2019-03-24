const test = require('tape');
const request = require('supertest');
const app = require('../src/app');

test('get in /donate (donate page)', (t) => {
  request(app)
    .get('/donate')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(
          res.text.includes('Enhance A Smile'),
          true,
          'get donate page sucsesfully',
        );
        t.end();
      }
    });
});

test('post in /donate (with valid data)', (t) => {
  request(app)
    .post('/donate')
    .send({
      fullName: 'aminamin',
      phoneNumber: '1234567899',
      cityName: 'gaza',
      email: 'amia@gmail.com',
      numberOfClothes: '12',
      quality: ['good'],
      gender: ['man'],
      season: ['summer'],
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(
          JSON.parse(res.text).msg.includes('donation added sucsesfully'),
          true,
          'donation added sucsesfully to database',
        );
        t.end();
      }
    });
});

test('post in /donate (with Not valid numberOfClothes)', (t) => {
  request(app)
    .post('/donate')
    .send({
      fullName: 'aminamin',
      phoneNumber: '1234567899',
      cityName: 'gaza',
      email: 'amia@gmail.com',
      numberOfClothes: 12,
      quality: ['good'],
      gender: ['man'],
      season: ['summer'],
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        console.log(res.text);
        t.equal(
          JSON.parse(res.text).msg.includes('must be a string'),
          true,
          'donation added fail to database',
        );
        t.end();
      }
    });
});

test.onFinish(() => process.exit(0));