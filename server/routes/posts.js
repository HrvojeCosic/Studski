const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: './fileUploads/' });

const postController = require('../controllers/postController');

router.post('/submit', upload.single('file'), postController.createNewPost);
router.get('/getFacultyPosts/:facultyName', postController.getFacultyPosts);
router.get('/getUserPosts/:username', postController.getUserPosts);
router.get('/getPost/:postID', postController.getSinglePost);
router.patch('/voteForPost', postController.voteForPost);
module.exports = router;
