const express = require('express');
const kandidat = require('../controller/kandidat');
const validateToken = require('../auth/auth.js').validateToken;

let router = express.Router();

router.get('/private', kandidat.test);
router.post('/add',validateToken, kandidat.add);
router.put('/update/:id',validateToken, kandidat.update);
router.get('/getAll',validateToken, kandidat.getAll);
router.get('/get/:id',validateToken, kandidat.getById);
router.delete('/delete/:id',validateToken, kandidat.deleteById);

module.exports = router;

