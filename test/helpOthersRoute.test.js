const tape = require('tape');
const supertest = require('supertest');
const app = require('./../src/app.js');

tape('Testing Help-Others Route', (t) => {
  supertest(app)
    .get('/help-others')
    .expect(200)
    .expect('content-type', /html/)
    .end((err, res) => {
      if (err) t.error(err);
      t.equals(res.text.includes('class="user-restrictions"'), true, 'PASS 1');
      t.equals(res.text.includes('class="instructions"'), true, 'PASS 2');
    });
  supertest(app)
    .post('/help-others')
    .send({
      'personal-details': {
        fullName: 'Ahmed Abdellatif',
        phoneNumber: '05922075999',
        email: 'ahmed@gmail.com',
      },
      'request-details': {
        numOfPeople: 4,
        location: 'gaza',
      },
    })
    .expect(400)
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.text.includes('fails to match'), true, 'PASS 3');
      t.equal(res.text.includes('05922075999'), true, 'PASS 4');
    });
  supertest(app)
    .post('/help-others')
    .send({
      'personal-details': {
        fullName: 'Ahmed Abdellatif',
        phoneNumber: '0592207599',
        email: 'ahmed@gmail',
      },
      'request-details': {
        numOfPeople: 4,
        location: 'gaza',
      },
    })
    .expect(400)
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.text.includes('email'), true, 'PASS 3');
      t.equal(JSON.parse(res.text).msg, '"email" must be a valid email', 'PASS 5');
    });
  supertest(app)
    .post('/help-others')
    .send({
      'personal-details': {
        fullName: 'Ahmed Abdellatif',
        phoneNumber: '0592207599',
        email: 'ahmed@gmail.com',
      },
      'request-details': {
        numOfPeople: 4,
        location: 'gaza',
      },
    })
    .expect(200)
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(JSON.parse(res.text).msg, 'Added successfully', 'PASS 6');
      t.end();
    });
});

tape.onFinish(() => process.exit(0));
