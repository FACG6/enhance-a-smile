const joi = require('joi');
const insertQuery = require('./../../database/queries/user/insertQuery');

exports.postRegisterEmail = (request, response) => {
  const schema = joi.object().keys({
    email: joi.string().email({ minDomainAtoms: 2 }),
  });
  const { email } = request.body;
  const result = joi.validate({ email }, schema);
  if (result.error === null) {
    insertQuery('registers', { email })
      .then((res) => {
        response.status(200).send({ msg: res });
      })
      .catch(() => response.status(500).send({ msg: 'there is some error in server please try again later' }));
  } else {
    response.status(200).send({ msg: 'email not validate' });
  }
};
