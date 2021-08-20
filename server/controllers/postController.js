const Post = require('../models/Post');

module.exports.createNewPost = (req, res) => {
	const { file } = req;
	const { facultyName, facultyArea, postTitle } = req.body;
	if (
		facultyName.length <= 0 ||
		facultyArea.length <= 0 ||
		postTitle.length <= 0
	) {
		return res
			.status(403)
			.json({ title: 'error', error: 'Sva polja moraju biti ispunjena.' });
	}
	return res
		.status(200)
		.json({ title: 'success', message: 'Materijal uspješno objavljen.' });
};
