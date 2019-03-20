
const { join } = require('path');

exports.request = (req, res) => {
  res.render('main/request', {
    css: [join('user', 'request')],
    js: [join('user', 'requestDom')],
  });
};
