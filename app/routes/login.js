const express = require('express');
const login = require('../controller/login');
const validateToken = require('../auth/auth.js').validateToken;

let router = express.Router();

router.get('/private', validateToken, login.test);
router.post('/login',login.login);

module.exports = router;

