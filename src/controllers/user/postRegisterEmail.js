const joi = require('joi');
const insertQuery = require('./../../database/queries/user/insertQuery');

exports.postRegisterEmail = (request, response) => {
  const schema = joi.object().keys({
    email: joi.string().email({ minDomainAtoms: 2 }),
  });
  const { email } = request.body;
  const result = joi.validate({ email }, schema);
  if (result.error === null) {
    insertQuery('registers', email)
      .then()
      .catch();
    response.send({ msg: 'done' });
  } else {
    response.send({ msg: 'email not validate' });
  }
};
