const { join } = require('path');
const getQuery = require('./../../../database/queries/admin/getQuery');

exports.getAdminRegisters = (request, response) => {
  getQuery('registers', {})
    .then((res) => {
      response.render(join('admin', 'adminRegister'), {
        layout: 'admin',
        css: [
          join('partials', 'adminSidebar'),
          join('partials', 'adminNav'),
          join('admin', 'registers'),
        ],
        js: ['domUyils', join('admin', 'registers')],
        res,
        adminName: request.token.name,
      });
    })
    .catch(() => {
      response.status(500).send('Server Error');
    });
};
