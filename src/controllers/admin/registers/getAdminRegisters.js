const { join } = require('path');
const getQuery = require('./../../../database/queries/admin/getQuery');

exports.getAdminRegisters = (request, response) => {
  if (request.token) {
    response.redirect('/admin/login');
  } else {
    getQuery('registers', {})
      .then((res) => {
        response.render(join('admin', 'adminRegister'), {
          layout: 'admin',
          css: [join('admin', 'registers')],
          js: ['domUyils', join('admin', 'registers')],
          registersEmail: res,
        });
      })
      .catch(() => {
        response.status(500).send('Server Error');
      });
  }
};
