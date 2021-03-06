const express = require('express');
const { request } = require('./user/request');
const { getHomePage } = require('./user/getHomePage');
const { getDonate, postDonate } = require('./user/donate');
const { postContactUs } = require('./user/postContactUs');
const { postRegisterEmail } = require('./user/postRegisterEmail');
const { postRequest } = require('./user/postRequest');
const { getAdminContactUs } = require('./admin/contactUs/getAdminContactUs');
const { getAdminRegisters } = require('./admin/registers/getAdminRegisters');
const { postSendEmails } = require('./admin/registers/postSendEmails');
const { postAdminContactUs } = require('./admin/contactUs/postAdminContactUs');
const helpOthers = require('./user/helpOthers.js');
const adminHelpOthers = require('./admin/help-others/helpOthers.js');
const adminLogin = require('./admin/login.js');
const adminProfile = require('./admin/profile.js');
const auth = require('./../middlewars/auth.js');
const { getDonates } = require('./admin/donate/donate');
const { postDonates } = require('./admin/donate/donate');
const { getAdminSetting, postAdminSettings } = require('./admin/settings/adminSetting');
const error = require('./error.js');
const adminRequests = require('./admin/request/request.js');

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
  .route('/admin/requests')
  .get(adminRequests.get)
  .post(adminRequests.post);
router
  .route('/admin/settings')
  .get(getAdminSetting)
  .post(postAdminSettings);
router
  .route('/admin/help-others')
  .get(adminHelpOthers.get)
  .post(adminHelpOthers.post);
router
  .route('/admin/requests')
  .get(adminRequests.get)
  .post(adminRequests.post);
router.get('/admin/contact-us', getAdminContactUs);
router.post('/admin/contact-us', postAdminContactUs);
router.get('/admin/registers', getAdminRegisters);
router.post('/admin/registers', postSendEmails);
router.get('/admin/logout', (req, res) => {
  Object.keys(req.cookies).forEach(key => res.clearCookie(key));
  res.redirect('/admin/login');
});
router.use(error.client);
router.use(error.server);
module.exports = { router };
