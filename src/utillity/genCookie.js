const { sign } = require('jsonwebtoken');

module.exports = payload => new Promise((resolve, reject) => {
  sign(payload, process.env.SECRET, (err, token) => {
    if (err) reject(err);
    else resolve(token);
  });
});
