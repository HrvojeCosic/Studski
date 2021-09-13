const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const auth = require('../controllers/auth');

router.post('/register', userController.createNewUser);
router.post('/login', userController.logUserIn);
router.post('/checkAuth', auth.checkAuth);
router.get('/requestUsers/:currentNumber', userController.getUsers);
module.exports = router;
