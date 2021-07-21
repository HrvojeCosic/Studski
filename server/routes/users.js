const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/register', userController.createNewUser);

module.exports = router;
