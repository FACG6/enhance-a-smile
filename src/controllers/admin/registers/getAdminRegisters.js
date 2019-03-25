const { join } = require('path');

exports.getAdminRegisters = (request, response) => {
  if (request.token) {
    response.render();
  } else {
    response.render(join('admin', 'adminRegister'), {
      layout: 'admin',
      css: [join('admin', 'registers')],
      js: ['domUyils', join('admin', 'registers')],
      registersEmail: ['amin@gmial.com', 'abdallah@gmial.com'],
    });
  }
};
