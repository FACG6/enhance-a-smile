const express = require('express');
const { getHomePage } = require('./user/getHomePage');
const { getDonate, postDonate } = require('./user/donate');
const { postContactUs } = require('./user/postContactUs');
const { postRegisterEmail } = require('./user/postRegisterEmail');
const helpOthers = require('./user/helpOthers.js');

const router = express.Router();

router.get('/', getHomePage);
router.get('/help-others', helpOthers.get);
router.post('/contact-us', postContactUs);
router.post('/register', postRegisterEmail);
router
  .route('/donate')
  .get(getDonate)
  .post(postDonate);

module.exports = { router };
