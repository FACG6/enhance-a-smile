const express = require('express');
const { request } = require('./main/request');
const { getHomePage } = require('./user/getHomePage');
const { donate } = require('./main/donate');
const { postContactUs } = require('./user/postContactUs');
const { postRegisterEmail } = require('./user/postRegisterEmail');

const router = express.Router();
router.get('/request', request);
router.get('/donate', donate);
router.get('/', getHomePage);
router.post('/contact-us', postContactUs);
router.post('/register', postRegisterEmail);


module.exports = { router };
