const express = require('express');
const student = require('../controller/student');
const validateToken = require('../auth/auth.js').validateToken;

let router = express.Router();

router.get('/getAll', validateToken ,student.getAll);

module.exports = router;