const express = require('express');
const login = require('../controller/login');
const validateToken = require('../auth/auth.js').validateToken;

let router = express.Router();

router.get('/private', login.test);
router.post('/login',login.login);
router.post('/loginMhs',login.loginMhs);

module.exports = router;

