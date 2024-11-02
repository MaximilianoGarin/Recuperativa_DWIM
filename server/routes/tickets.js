const express = require('express');
const router = express.Router();
const { createTicket, createAdditionalTicket } = require('../controllers/ticketController');

router.post('/sell', createTicket);
router.post('/sell/additional', createAdditionalTicket);

module.exports = router;