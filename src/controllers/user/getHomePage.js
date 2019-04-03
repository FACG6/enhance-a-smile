const { join } = require('path');
const requestIp = require('request-ip');

exports.getHomePage = (request, response) => {
  const clientIp = requestIp.getClientIp(request);
  console.log(1111111111, clientIp);
  var ip = request.header('x-forwarded-for') || request.connection.remoteAddress
  console.log(ip);
  response.render(join('main', 'home'), {
    css: [join('user', 'home'), join('partials', 'homeNav')],
    js: ['validation', 'domUyils', join('user', 'home')],
  });
};
