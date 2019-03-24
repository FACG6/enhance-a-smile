const { join } = require('path');

exports.get = (req, res) => {
  res.render(join('admin', 'profile.hbs'), {
    layout: 'admin',
  });
};
