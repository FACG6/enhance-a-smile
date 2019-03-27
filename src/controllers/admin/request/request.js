const { join } = require('path');
const getQuery = require('../../../database/queries/admin/getQuery');
const insertOne = require('../../../database/queries/admin/insertOne');

exports.get = (request, response) => {
  getQuery('requests', {})
    .then((card) => {
      response.status(200).render('admin/requests', {
        js: ['domUyils', join('admin', 'requestsDom')],
        css: [
          join('partials', 'adminSidebar'),
          join('partials', 'adminNav'),
          join('admin', 'requests'),
        ],
        layout: 'admin',
        card,
      });
    })
    .catch(() => {
      response.status(500).send({
        msg: 'server error',
      });
    });
};

exports.post = (request, response) => {
  const { id, obj } = request.body;
  if (obj.current) {
    insertOne('requests', id, obj)
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
    insertOne('requests', id, obj)
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
