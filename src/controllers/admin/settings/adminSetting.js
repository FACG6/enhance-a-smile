const {
  join,
} = require('path');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const {
  compare,
} = require('bcryptjs');
const unlookCookies = require('./../../../utillity/checkCookie');
const getAdmin = require('./../../../database/queries/admin/getQuery');
const updateAdmin = require('../../../database/queries/admin/update');
const genCookie = require('../../../utillity/genCookie');
const getQuery = require('../../../database/queries/admin/getQuery.js');


exports.getAdminSetting = (request, response) => {
  unlookCookies(request.cookies.jwt)
    .then((cookieObj) => {
      getAdmin('admins', {
        email: cookieObj.email,
      })
        .then((adminInfo) => {
          response.status(200).render(join('admin', 'adminSettings'), {
            layout: 'admin',
            js: ['domUyils', join('admin', 'setting')],
            css: [
              join('partials', 'adminSidebar'),
              join('partials', 'adminNav'),
              join('admin', 'setting'),
            ],
            adminInfo,
          });
        })
        .catch(() => {
          response.status(500).send({
            msg: 'error from database',
          });
        });
    })
    .catch(() => {
      response.status(500).send({
        msg: 'error from unlook the cookies',
      });
    });
};

const hashPass = password => bcrypt.hash(password, 10);

exports.postAdminSettings = (request, response, next) => {
  if (!request.body.newPassword) {
    delete request.body.newPassword;
    delete request.body.confirmPassword;
    var schema = Joi.object().keys({
      full_name: Joi.string()
        .min(5)
        .max(30)
        .required(),
      email: Joi.string()
        .email({
          minDomainAtoms: 2,
        }),
      oldPassword: Joi.string()
        .min(3)
        .required(),
    });
  } else {
    var schema = Joi.object().keys({
      full_name: Joi.string()
        .min(5)
        .max(30)
        .required(),
      email: Joi.string()
        .email({
          minDomainAtoms: 2,
        }),
      oldPassword: Joi.string()
        .min(3)
        .required(),
      newPassword: Joi.string()
        .min(3)
        .required(),
      confirmPassword: Joi.string()
        .min(3)
        .required(),
    });
  }
  const result = Joi.validate(request.body, schema);
  if (result.error) {
    response.status(401).send({
      msg: result.error.details[0].message,
    });
  } else {
    const {
      email,
    } = request.body;
    getQuery('admins', {
      email,
    })
      .then((result) => {
        if (result.length === 0) {
          return response.status(400).send({
            msg: 'email is wrong',
          });
        }
        compare(request.body.oldPassword, result[0].password)
          .then((isPass) => {
            if (!isPass) {
              response.status(401).send({
                msg: 'password is wrong',
              });
            } else if (request.body.newPassword) {
              hashPass(request.body.newPassword)
                .then((hashedPass) => {
                  const obj = {
                    password: hashedPass,
                    full_name: request.body.full_name,
                    email: request.body.email,
                  };
                  updateAdmin('admins', request.cookies.name, obj)
                    .then((res) => {
                      const {
                        email,
                      } = obj;
                      genCookie({
                        email,
                      })
                        .then((token) => {
                          response.clearCookie('jwt');
                          response.clearCookie('name');
                          response.cookie('jwt', token, {
                            maxAge: 1000 * 60 * 60 * 24 * 30,
                          });
                          response.cookie('name', request.body.full_name, {
                            maxAge: 1000 * 60 * 60 * 24 * 30,
                          });
                          response.status(200).send({
                            msg: 'settings update',
                          });
                        })
                        .catch((err) => {
                          response.status(500).send({
                            msg: 'server error',
                          });
                        });
                    })
                    .catch((er) => {
                      response.status(500).send({
                        msg: 'server error',
                      });
                    });
                })
                .catch((q) => {
                  response.status(500).send({
                    msg: 'server error',
                  });
                });
            } else {
              const obj = {
                full_name: request.body.full_name,
                email: request.body.email,
              };
              updateAdmin('admins', request.cookies.name, obj)
                .then(() => {
                  const {
                    email,
                  } = obj;
                  return genCookie({
                    email,
                  });
                })
                .then((token) => {
                  response.clearCookie('jwt');
                  response.clearCookie('name');
                  response.cookie('jwt', token, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                  });
                  response.cookie('name', request.body.full_name, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                  });
                  response.status(200).send({
                    msg: 'settings update',
                  });
                });
            }
          });
      }).catch(() => {
        response.status(500).send({
          msg: 'server error',
        });
      });
  }
};
