const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const upload = require('../controllers/fileUploader');

router.post('/submit', upload.array('files'), postController.createNewPost);
router.get('/getFacultyPosts/:facultyName', postController.getFacultyPosts);
router.get('/getUserPosts/:username', postController.getUserPosts);
router.get('/getPost/:postID', postController.getSinglePost);
router.get('/checkVoted/:username/:postID', postController.checkVoted);
router.patch('/voteForPost', postController.voteForPost);
module.exports = router;
