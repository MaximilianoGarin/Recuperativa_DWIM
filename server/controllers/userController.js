const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/userController');

router.get('/', getUsers);
router.delete('/:userId', deleteUser);

module.exports = router;