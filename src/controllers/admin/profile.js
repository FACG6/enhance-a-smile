const { join } = require('path');
const getQuery = require('../../database/queries/admin/getQuery');

exports.get = (request, response) => {
  const fullName = request.cookies.name;
  let totalDonation = 0;
  getQuery('admins', {
    full_name: fullName,
  })
    .then((res) => {
      getQuery('donates', {}).then((totalDonations) => {
        if (Object.keys(res).length !== 0) {
          totalDonation = Object.keys(totalDonations).length;
        }
        response.render(join('admin', 'profile'), {
          layout: 'admin',
          result: res,
          totalDonations: totalDonation,
          css: [join('admin', 'profile'), join('partials', 'adminNav'), join('partials', 'adminSidebar')],
          js: ['domUyils', join('admin', 'profile'), join('admin', 'sidebar')],
        });
      });
    }).catch((error) => {
      response.send(error);
    });
};
