const { join } = require('path');
const getQuery = require('../../../database/queries/admin/getQuery');
const insertOne = require('../../../database/queries/admin/insertOne');

exports.get = (request, response) => {
  getQuery('help-others', {})
    .then((card) => {
      response.status(200).render('admin/helpOthers', {
        js: ['domUyils', join('admin', 'helpOthersDom')],
        css: [
          join('partials', 'adminSidebar'),
          join('partials', 'adminNav'),
          join('admin', 'helpOthers'),
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
    insertOne('help-others', id, obj)
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
    insertOne('help-others', id, obj)
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
