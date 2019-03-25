const express = require('express');
const { request } = require('./user/request');
const { getHomePage } = require('./user/getHomePage');
const { getDonate, postDonate } = require('./user/donate');
const { postContactUs } = require('./user/postContactUs');
const { postRegisterEmail } = require('./user/postRegisterEmail');
const { postRequest } = require('./user/postRequest');
<<<<<<< HEAD
const { getAdminContactUs } = require('./admin/contactUs/adminContactUs');
=======
const { getAdminRegisters } = require('./admin/registers/getAdminRegisters');
>>>>>>> ac8f28d3933089d423a21d972ce2809df57e6cdd
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
router.get('/admin/login', adminLogin.get);
router.get('/admin/contact-us', getAdminContactUs);
router.get('/admin/registers', getAdminRegisters);
// use the auth middleware
router.get('/admin/profile', adminProfile.get);
module.exports = { router };
