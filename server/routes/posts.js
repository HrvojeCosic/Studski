const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.post('/submit', postController.createNewPost);
module.exports = router;
