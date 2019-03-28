const { join } = require('path');
const getQuery = require('../../../database/queries/admin/getQuery');

exports.getAdminContactUs = (request, response) => {
  getQuery('contacts', {})
    .then((res) => {
      response.render(join('admin', 'adminContactUs'), {
        layout: 'admin',
        css: [
          join('partials', 'adminSidebar'),
          join('partials', 'adminNav'),
          join('admin', 'contactUs'),
        ],
        js: ['domUyils', join('admin', 'contactUs')],
        res,
        adminName: request.token.name,
      });
    })
    .catch(() => {
      response.status(500).send('Server Error');
    });
};
