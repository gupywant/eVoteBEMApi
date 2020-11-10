const express = require('express');
const candidate = require('../controller/candidate');
const validateToken = require('../auth/auth.js').validateToken;

let router = express.Router();

router.post('/add',validateToken, candidate.create);
router.put('/update/:id',validateToken, candidate.update);
router.get('/getAll',validateToken, candidate.getAll);
router.get('/get/:id',validateToken, candidate.getById);
router.delete('/delete/:id',validateToken, candidate.deleteById);

module.exports = router;