const { join } = require('path');

exports.get = (req, res) => {
  res.render(join('main', 'helpOthers'), {
    js: [join('user', 'helpOthers')],
    css: [join('partials', 'homeNav'), join('user', 'helpOthers')],
  });
};
