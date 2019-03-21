const joi = require('joi');
const insertEmailRegister = require('./../../database/queries/user/insertEmailRegister');

exports.postRegisterEmail = (request, response) => {
  const schema = joi.object().keys({
    email: joi.string().email({ minDomainAtoms: 2 }),
  });
  const { email } = request.body;
  const result = joi.validate({ email }, schema);
  if (result.error === null) {
    insertEmailRegister(email)
      .then()
      .catch();
    response.send({ msg: 'done' });
  } else {
    response.send({ msg: 'email not validate' });
  }
};
