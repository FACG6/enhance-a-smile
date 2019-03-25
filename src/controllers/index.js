const express = require('express');
const { request } = require('./user/request');
const { getHomePage } = require('./user/getHomePage');
const { getDonate, postDonate } = require('./user/donate');
const { postContactUs } = require('./user/postContactUs');
const { postRegisterEmail } = require('./user/postRegisterEmail');
const { postRequest } = require('./user/postRequest');
const helpOthers = require('./user/helpOthers.js');
const adminLogin = require('./admin/login.js');
const adminProfile = require('./admin/profile.js');

const router = express.Router();
router.get('/', getHomePage);
router.get('/request', request);
router
  .route('/help-others')
  .get(helpOthers.get)
  .post(helpOthers.post);
router.post('/contact-us', postContactUs);
router.post('/register', postRegisterEmail);
router.post('/request', postRequest);
router
  .route('/donate')
  .get(getDonate)
  .post(postDonate);
router.get('/admin', (req, res) => res.redirect('/admin/login'));
router
  .route('/admin/login')
  .get(adminLogin.get)
  .post(adminLogin.post);
// use the auth middleware
router.get('/admin/profile', adminProfile.get);
module.exports = { router };
