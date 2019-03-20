const { join } = require('path');

exports.getHomePage = (request, response) => {
  response.render(join('main', 'home'), {
    css: [join('user', 'home'), join('partials', 'homeNav')],
    js: ['innerTextRemove', 'validation', 'selectorFuction', join('user', 'home')],
  });
};
