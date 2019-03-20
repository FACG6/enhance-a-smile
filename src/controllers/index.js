const express = require('express');
const { getHomePage } = require('./user/getHomePage');
const { donate } = require('./user/donat');
const { postContactUs } = require('./user/postContactUs');
const { postRegisterEmail } = require('./user/postRegisterEmail');
const helpOthers = require('./user/helpOthers.js');

const router = express.Router();

router.get('/', getHomePage);
router.get('/donate', donate);
router.get('/help-others', helpOthers.get);
router.post('/contact-us', postContactUs);
router.post('/register', postRegisterEmail);

module.exports = { router };
