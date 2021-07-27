const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/register', userController.createNewUser);
router.post('/login', userController.logUserIn);
module.exports = router;
