const joi = require('joi');
const insertQuery = require('./../../database/queries/user/insertQuery');

exports.postContactUs = (request, response) => {
  const schema = joi.object().keys({
    email: joi.string().email({ minDomainAtoms: 2 }),
    fullName: joi
      .string()
      .alphanum()
      .max(30)
      .required(),
    message: joi
      .string()
      .alphanum()
      .required(),
  });
  const { email, fullName, message } = request.body;
  const data = {
    email,
    fullName,
    message,
  };
  const result = joi.validate({ email, fullName, message }, schema);
  if (result.error === null) {
    insertQuery('registers', data).then(() => {
      response.send({ msg: 'done' });
    });
  } else {
    response.send({ msg: 'inputs not validate' });
  }
};
