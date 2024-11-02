const express = require('express');
const router = express.Router();
const { registerSale } = require('../controllers/salesController');

router.post('/register', registerSale);

module.exports = router;