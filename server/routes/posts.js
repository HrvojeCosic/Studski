const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const upload = require('../controllers/fileUploader');

router.post('/submit', upload.array('files'), postController.createNewPost);
router.get('/getFacultyPosts/:facultyName', postController.getFacultyPosts);
router.get('/getUserPosts/:username', postController.getUserPosts);
router.get('/getLatestPosts', postController.getLatestPosts);
router.get('/getPost/:postID', postController.getSinglePost);
router.get('/downloadFile/:fileName', postController.downloadFile);
router.get('/checkVoted/:username/:postID', postController.checkVoted);
router.delete('/deletePost/:postID', postController.deletePost);
router.patch('/voteForPost', postController.voteForPost);
module.exports = router;
