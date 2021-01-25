const express = require('express');
const vote = require('../controller/vote');
const validateToken = require('../auth/auth.js').validateToken;

let router = express.Router();


router.post('/vote',validateToken, vote.vote);
router.get('/counter', vote.count);

module.exports = router;

