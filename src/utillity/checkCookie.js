const { verify } = require('jsonwebtoken');

module.exports = cookie => new Promise((resolve, reject) => {
  verify(cookie, process.env.SECRET, (err, payload) => {
    if (err) reject(err);
    else resolve(payload);
  });
});
