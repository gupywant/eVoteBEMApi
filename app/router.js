const loginController = require('./routes/login');
const candidateController = require('./routes/candidate');
const express = require('express');
let router = express.Router();

router.use('/auth', loginController);
router.use('/candidate', candidateController);
module.exports = router;
