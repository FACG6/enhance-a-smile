const express = require('express');
const { request } = require('./main/request');
const { getHomePage } = require('./user/getHomePage');
const { getDonate, postDonate } = require('./user/donate');
const { postContactUs } = require('./user/postContactUs');
const { postRegisterEmail } = require('./user/postRegisterEmail');
const { postRequest } = require('./user/postRequest');

const router = express.Router();
router.get('/request', request);
router.get('/donate', donate);
router.get('/', getHomePage);
router.post('/contact-us', postContactUs);
router.post('/register', postRegisterEmail);
router.route('/donate')
  .get(getDonate)
  .post(postDonate);

module.exports = { router };
