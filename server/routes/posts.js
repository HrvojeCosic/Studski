const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: './fileUploads/' });

const postController = require('../controllers/postController');

router.post('/submit', upload.single('material'), postController.createNewPost);
module.exports = router;
