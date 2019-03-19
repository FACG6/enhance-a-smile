const express = require('express');
const requestForYou=require('./main/request')
const { donate } = require('./main/donat')

const router = express.Router();
router.get('/request',requestForYou.get)

router.get('/donate', donate);


const { donate } = require('./main/donat')

router.get('/donate', donate);

module.exports = { router };
