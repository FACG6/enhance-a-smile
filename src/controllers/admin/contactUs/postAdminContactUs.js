const insertOne = require('../../../database/queries/admin/insertOne');

exports.postAdminContactUs = (request, response) => {
  if (request.token) {
    response.redirect('/admin/login');
  } else {
    const { id } = request.body;
    insertOne('contacts', id, { done: 'done' })
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
  }
};
