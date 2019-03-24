const { join } = require('path');
const joi = require('joi');
const insertQuery = require('./../../database/queries/user/insertQuery.js');

exports.get = (req, res) => {
  res.render(join('main', 'helpOthers'), {
    js: ['domUyils', join('user', 'helpOthers')],
    css: [join('partials', 'homeNav'), join('user', 'helpOthers')],
  });
};

exports.post = (req, res) => {
  const schema = joi.object().keys({
    'personal-details': {
      fullName: joi
        .string()
        .min(6)
        .max(30)
        .required(),
      phoneNumber: joi
        .string()
        .regex(/^[0-9]{10}$/)
        .length(10)
        .required(),
      email: joi.string().email({ minDomainAtoms: 2 }),
    },
    'request-details': {
      numOfPeople: joi
        .number()
        .min(1)
        .max(5)
        .required(),
      phoneNumber: joi
        .string()
        .regex(/^[0-9]{10}$/)
        .length(10),
      location: joi
        .string()
        .min(0)
        .max(30)
        .required(),
      description: joi.string(),
    },
  });
  const valid = joi.validate(req.body, schema);
  if (valid.error) {
    res.status(400).send({
      msg: valid.error.details[0].message,
    });
  } else {
    insertQuery('help-others', req.body)
      .then(() => {
        res.status(200).send({ msg: 'Added successfully' });
      })
      .catch((err) => {
        res.status(500).end({ msg: 'Internal server error' });
      });
  }
};
