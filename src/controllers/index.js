const express = require('express');
const { request } = require('./user/request');
const { getHomePage } = require('./user/getHomePage');
const { getDonate, postDonate } = require('./user/donate');
const { postContactUs } = require('./user/postContactUs');
const { postRegisterEmail } = require('./user/postRegisterEmail');
const { postRequest } = require('./user/postRequest');
const { getAdminContactUs } = require('./admin/contactUs/adminContactUs');
const { getAdminRegisters } = require('./admin/registers/getAdminRegisters');
const { postSendEmails } = require('./admin/registers/postSendEmails');
const helpOthers = require('./user/helpOthers.js');
const adminLogin = require('./admin/login.js');
const adminProfile = require('./admin/profile.js');
const auth = require('./../middlewars/auth.js');
const { getDonates } = require('./admin/donate/donate');
const { postDonates } = require('./admin/donate/donate');
const { getAdminSetting, postAdminSettings } = require('./admin/settings/adminSetting');

const router = express.Router();
// user routes
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

// admin routes
router.get('/admin', (req, res) => res.redirect('/admin/login'));
router
  .route('/admin/login')
  .get(adminLogin.get)
  .post(adminLogin.post);
router.use(auth);
router.get('/admin/profile', adminProfile.get);
router
  .route('/admin/donates')
  .get(getDonates)
  .post(postDonates);
router
  .route('/admin/settings')
  .get(getAdminSetting)
  .post(postAdminSettings);
router.get('/admin/contact-us', getAdminContactUs);
router.get('/admin/registers', getAdminRegisters);
router.post('/admin/registers', postSendEmails);
module.exports = { router };
