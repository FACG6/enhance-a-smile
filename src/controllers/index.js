const express = require('express');
const { getHomePage } = require('./user/getHomePage');
const { donate } = require('./main/donat');

const router = express.Router();

router.get('/', getHomePage);

router.get('/donate', donate);

module.exports = { router };
