const {
  join
} = require('path');
const Joi = require('joi');

const insertDonation = require('../../database/queries/user/insertDonate');

exports.getDonate = (request, response) => {
  response.render(join('main', 'donate'), {
    js: ['domUyils', join('user', 'donateDom')],
    css: [join('user', 'donate'), join('partials', 'homeNav')],
  });
};

exports.postDonate = (request, response) => {
  const schema = Joi.object().keys({
    fullName: Joi.string().alphanum().min(6).max(30)
      .required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    cityName: Joi.string().alphanum().min(3).max(30)
      .required(),
    email: Joi.string().email({
      minDomainAtoms: 2,
    }).required(),
    numberOfClothes: Joi.string().min(1).max(2).required(),
    quality: Joi.array().min(1).max(3).required(),
    gender: Joi.array().min(1).max(3).required(),
    season: Joi.array().min(1).max(4).required(),
  });
  const result = Joi.validate(request.body, schema);
  if (result.error) {
    response.status(400)send({
      msg: result.error.details[0].message,
    });
  } else {
    insertDonation(request.body)
      .then((dataRes) => {
        if (dataRes.msg === 'donate added sucssfully') {
          response.status(200).send({
            msg: 'donation added sucsesfully',
          });
        }
      })
      .catch((error) => {
        response.status(500).send({
          msg: 'error in add the donation information',
        });
      });
  }
};
