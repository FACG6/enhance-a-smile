const joi = require('joi');

exports.postRegisterEmail = (request, response) => {
  console.log(request.body);
  const schema = joi.object().keys({
    email: joi.string().email({ minDomainAtoms: 2 }),
  });
  const result = joi.validate({ email: request.body.email }, schema);
  if (result.error === null) {
    response.send({ msg: 'done' });
  } else {
    response.send({ msg: 'email not validate' });
  }
};
