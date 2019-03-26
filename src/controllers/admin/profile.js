const { join } = require('path');
const getQuery = require('../../database/queries/admin/getQuery');

exports.get = (request, response) => {
  const fullName = request.token;
  getQuery('admins', { full_name: 'Ahmed Abdellatif' }).then((res) => {
    response.render(join('admin', 'profile'), {
      layout: 'admin',
      result: res,
      css: [join('admin', 'profileAdmin')],
    });
  }).catch((error) => {
    response.send(error);
  });
};
