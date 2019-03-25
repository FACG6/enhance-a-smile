const { join } = require('path');
const donates = require('../../../database/queries/admin/getQuery');
// const update = require('');

exports.getDonates = (request, response) => {
  donates('donates', {})
    .then((card) => {
      response.render('admin/donates', {
        js: ['domUyils', join('admin', 'donateDom')],
        css: [join('admin', 'donate')],
        layout: 'admin',
        card,
      });
    }).catch((err) => console.log(err))
};

// exports.postCurrent = (request, response) => {

// }

// exports.postDone = (request, response) => {

// }
