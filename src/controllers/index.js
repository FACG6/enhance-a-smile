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
const adminLogin = require('./admin/login.js');
const adminProfile = require('./admin/profile.js');
const { getDonates } = require('./admin/donate/donate');
const { postDonates } = require('./admin/donate/donate');

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
router.get('/admin/login', adminLogin.get);
router
  .route('/admin/donates')
  .get(getDonates)
  .post(postDonates);
router.get('/admin/contact-us', getAdminContactUs);
router.post('/admin/contact-us', postAdminContactUs);
router.get('/admin/registers', getAdminRegisters);
router.post('/admin/registers', postSendEmails);
// use the auth middleware
router.get('/admin/profile', adminProfile.get);
module.exports = { router };
