const express = require('express');
const announcement = require('../controller/announcement');
const validateToken = require('../auth/auth.js').validateToken;

let router = express.Router();

router.post('/add',validateToken, announcement.create);
router.get('/getAll', announcement.getAll);
router.get('/get/:id', announcement.getById);
router.delete('/delete/:id',validateToken, announcement.deleteById);

module.exports = router;