const { join } = require('path');

exports.request = (req, res) => {
  res.render(join('main', 'request'), {
    css: [join('user', 'request'), join('partials', 'homeNav')],
    js: ['domUyils', join('user', 'requestDom')],
  });
};
