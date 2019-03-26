const { join } = require('path');

exports.get = (req, res) => {
  res.render(join('admin', 'profile.hbs'), {
    css: [join('partials', 'adminNav'), join('partials', 'adminSidebar')],
    js: ['domUyils', join('admin', 'sidebar')],
    layout: 'admin',
  });
};
