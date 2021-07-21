const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const sequelize = require('sequelize')

const userController = require('../controllers/userController');

router.get('/', (req, res) => {
	User.findAll();
});

module.exports = router;
