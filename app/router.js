const loginController = require('./routes/login');
const express = require('express');
let router = express.Router();

router.use('/auth', loginController);
module.exports = router;
