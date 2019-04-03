const { compare } = require('bcryptjs');
const { join } = require('path');
const genCookie = require('./../../utillity/genCookie.js');
const getQuery = require('./../../database/queries/admin/getQuery.js');
const checkCookie = require('./../../utillity/checkCookie.js');

exports.get = (req, res) => {
  if (req.cookies && req.cookies.jwt) {
    checkCookie(req.cookies.jwt)
      .then(() => {
        res.redirect('/admin/profile');
      })
      .catch(() => {
        res.clearCookie('jwt');
        res.redirect('/admin/login');
      });
  } else {
    res.render(join('admin', 'login'), {
      layout: 'adminLogin',
      css: [join('admin', 'login')],
      js: ['domUyils', join('admin', 'login')],
    });
  }
};

exports.post = (req, res) => {
  const { email, password } = req.body;
  getQuery('admins', { email })
    .then((result) => {
      if (result.length === 0) res.status(400).end();
      const { full_name: fullName } = result[0];
      compare(password, result[0].password)
        .then((isPass) => {
          if (!isPass) res.status(401).end();
          return genCookie({ email });
        })
        .then((token) => {
          res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 });
          res.cookie('name', fullName, { maxAge: 1000 * 60 * 60 * 24 });
          res.status(200).end();
        })
        .catch(() => res.status(500).end());
    })
    .catch(() => res.status(500).end());
};
