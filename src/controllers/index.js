const express = require('express');
const { getHomePage } = require('./user/getHomePage');

const router = express.Router();

router.get('/', getHomePage);

module.exports = { router };
