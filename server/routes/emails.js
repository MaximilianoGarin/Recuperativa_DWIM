const express = require('express');
const router = express.Router();
const { sendWeeklyReport } = require('../controllers/emailController');

router.post('/send-weekly-report', sendWeeklyReport);

module.exports = router;