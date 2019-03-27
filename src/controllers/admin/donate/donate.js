const {
  join,
} = require('path');
const donates = require('../../../database/queries/admin/getQuery');
const insertOne = require('../../../database/queries/admin/insertOne');

exports.getDonates = (request, response) => {
  donates('donates', {})
    .then((card) => {
      response.status(200).render('admin/donates', {
        js: ['domUyils', join('admin', 'donateDom')],
        css: [
          join('partials', 'adminNav'),
          join('partials', 'adminSidebar'),
          join('admin', 'donate'),
        ],
        layout: 'admin',
        card,
      });
    }).catch(() => {
      response.status(500).send({
        msg: 'server error',
      });
    });
};

exports.postDonates = (request, response) => {
  const {
    id,
    obj,
  } = request.body;
  if (obj.current) {
    insertOne('donates', id, obj)
      .then(() => {
        response.status(200).send({
          msg: 'convert from cerrent to done',
        });
      })
      .catch(() => {
        response.status(500).send({
          msg: 'server error',
        });
      });
  } else if (obj.done) {
    insertOne('donates', id, obj)
      .then(() => {
        response.status(200).send({
          msg: 'card convert from current to done',
        });
      })
      .catch(() => {
        response.status(500).send({
          msg: 'server error',
        });
      });
  }
};
