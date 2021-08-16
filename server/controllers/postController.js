const Post = require('../models/Post');

module.exports.createNewPost = (req, res, next) => {
	console.log(req.body.title);
	res.status(200).json({ title: 'ok' });
};
