const { join } = require('path');

exports.get = (request, response) => {
  response.render(join('admin', 'requests'), {
    css: [join('partials', 'adminSidebar'), join('partials', 'homeNav'), join('admin', 'request')],
    js: ['domUyils', join('admin', 'requestDom')],
    layout: 'admin',
  });
};
