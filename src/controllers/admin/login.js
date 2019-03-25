const { join } = require('path');

exports.get = (req, res) => {
  res.render(join('admin', 'login'), {
    layout: 'adminLogin',
    css: [join('admin', 'login')],
    js: ['domUyils', join('admin', 'login')],
  });
};
