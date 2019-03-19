const express = require('express');
const requestForYou=require('./main/request')

const router = express.Router();
router.get('/request',requestForYou.get)

module.exports = { router };
