// /server/routes/auth.js

const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController'); // Importar register

router.post('/login', login);
router.post('/register', register);

module.exports = router;