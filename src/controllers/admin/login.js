const { join } = require('path');
// const getQuery = require('./../../database/queries/admin/getQuery.js');

exports.get = (req, res) => {
  res.render(join('admin', 'login'), {
    layout: 'adminLogin',
    css: [join('admin', 'login')],
    js: ['domUyils', join('admin', 'login')],
  });
};

exports.post = (req, res) => {
  res.status(302);
};
