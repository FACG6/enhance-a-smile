const { join } = require('path');
const getQuery = require('../../../database/queries/admin/getQuery');

exports.getAdminContactUs = (request, response) => {
  if (request.token) {
    response.redirect('/');
  } else {
    getQuery('contacts', {})
      .then((res) => {
        response.render(join('admin', 'adminContactUs'), {
          layout: 'admin',
          css: [
            join('partials', 'sidebar'),
            join('partials', 'adminNav'),
            join('admin', 'contactUs'),
          ],
          js: ['domUyils', join('admin', 'contactUs')],
          res,
        });
      })
      .catch(() => {
        response.status(500).send('Server Error');
      });
  }
};
