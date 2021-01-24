const loginController = require('./routes/login');
const candidateDataController = require('./routes/candidateData');
const candidateController = require('./routes/candidate');
const announcementController = require('./routes/announcement');
const express = require('express');
let router = express.Router();

router.use('/auth', loginController);
router.use('/candidate', candidateController);
router.use('/candidateData', candidateDataController);
router.use('/announcement', announcementController);
module.exports = router;
