const express = require('express');
const { getHomePage } = require('./user/getHomePage');
const { donate } = require('./main/donat');
const { postContactUs } = require('./user/postContactUs');
const { postRegisterEmail } = require('./user/postRegisterEmail');

const router = express.Router();

router.get('/', getHomePage);
router.post('/contact-us', postContactUs);
router.post('/register', postRegisterEmail);
router.get('/donate', donate);

module.exports = { router };
