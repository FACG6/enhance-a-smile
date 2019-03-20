const { join } = require('path');

exports.donate = (req, res) => {
  res.render('main/donate', {
    js: [join('user', 'donateDom')],
    css: [join('user', 'donate')],
  });
};
