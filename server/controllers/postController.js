const Post = require('../models/Post');

module.exports.createNewPost = (req, res) => {
	return res
		.status(200)
		.json({ title: 'success', message: 'Materijal uspješno objavljen.' });
};
