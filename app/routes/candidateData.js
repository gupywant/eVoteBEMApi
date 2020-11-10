const express = require('express');
const candidateData = require('../controller/candidateData');
const validateToken = require('../auth/auth.js').validateToken;

let router = express.Router();

router.post('/add/:id',validateToken, candidateData.add);
router.put('/update/:id',validateToken, candidateData.update);
router.get('/getAll/:id',validateToken, candidateData.getAll);
router.get('/get/:id',validateToken, candidateData.getById);
router.delete('/delete/:id',validateToken, candidateData.deleteById);

module.exports = router;

