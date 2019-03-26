const test = require('tape');
const superTest = require('supertest');
const app = require('../src/app');

test('test for get request page with /request route', (t) => {
  superTest(app)
    .get('/request')
    .expect(200)
    .expect('content-type', 'text/html; charset=utf-8')
    .end((error, res) => {
      if (error) t.error(error);
      else {
        t.equals(res.text.includes('<title>Enhance A Smile</title>'), true, ' test of git request route is done');
        t.end();
      }
    });
});

test('test for post to /request route ', (t) => {
  superTest(app)
    .post('/request')
    .send({
      'personal-data': {
        fullName: 'jamalat',
        phoneNumber: '056983282545',
        cityName: 'gaza',
        streetName: 'eight street',
      },
      'request-data': {
        numberOfPieces: '12',
        gender: ['women', 'men'],
        season: ['winter', 'summer'],
        descrption: 't shirts, generally made of cotton.jjjjjjjj',
      },
    })
    .expect(200)
    .expect('content-type', /json/)
    .end((error, res) => {
      if (error) t.error(error);
      else {
        t.equal(JSON.parse(res.text).msg.includes('Your request added sucsesfully'), true, 'post to request route is done');
        t.end();
      }
    });
});
