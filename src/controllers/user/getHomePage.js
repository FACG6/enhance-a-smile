const { join } = require('path');

exports.getHomePage = (request, response) => {
  response.render('home', { css: [join('user', 'home')], js: ['selectorFuction', join('user', 'home')] });
};
