const { join } = require('path');

exports.getAdminContactUs = (request, response) => {
  if (request.token) {
    response.redirect('/');
  } else {
    response.render(join('admin', 'adminContactUs'), {
      layout: 'admin',
      css: [join('admin', 'contactUs')],
      js: ['domUyils', join('admin', 'contactUs')],
    });
  }
};