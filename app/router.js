const loginController = require('./routes/login');
const kandidatController = require('./routes/kandidat');
const express = require('express');
let router = express.Router();

router.use('/auth', loginController);
router.use('/kandidat', kandidatController);
module.exports = router;
