const express = require('express');

const router = express.Router();

const { donate } = require('./main/donat')

router.get('/donate', donate);

module.exports = { router };
