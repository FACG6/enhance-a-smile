const insertQuery = require('../../database/queries/user/insertQuery');

exports.postRequest = (request, response) => {
  const requestInformation = request.body;
  requestInformation.status = 'new';
  insertQuery('requests', requestInformation)
    .then(() => {
      response.status(200).send({
        msg: 'Your request added sucsesfully',
      });
    })
    .catch(() => response.status(500).send({
      msg: 'internal server error',
    }));
};
