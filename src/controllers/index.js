const express = require('express');
const { request } = require('./main/request');
const { getHomePage } = require('./user/getHomePage');
const { donate } = require('./main/donat');

const router = express.Router();
router.get('/request', request);
router.get('/donate', donate);
router.get('/', getHomePage);


module.exports = { router };
