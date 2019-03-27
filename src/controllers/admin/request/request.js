const { join } = require('path');
const getQuery = require('../../../database/queries/admin/getQuery');

exports.get = (request, response) => {
  let totalrequests = 0;
  getQuery('requests', {
    status: 'new',
  })
    .then((res) => {
      getQuery('requests', { }).then((totalRquests) => {
        if (Object.keys(totalRquests).length !== 0) {
          totalrequests = Object.keys(totalRquests).length;
        }
        response.render(join('admin', 'requests'), {
          layout: 'admin',
          result: res,
          totalrequests,
          css: [join('admin', 'request'), join('partials', 'adminNav'), join('partials', 'adminSidebar')],
          js: ['domUyils', join('admin', 'requestDom'), join('admin', 'sidebar')],
        });
      });
    }).catch((error) => {
      response.send(error);
    });
};
