const Post = require('../models/Post');

module.exports.createNewPost = (req, res) => {
	const { facultyName, facultyArea, postTitle, file } = req.body;
	if (
		facultyName.length <= 0 ||
		facultyArea.length <= 0 ||
		postTitle.length <= 0 ||
		file.length <= 0
	) {
		return res
			.status(403)
			.json({ title: 'error', error: 'Sva polja moraju biti ispunjena.' });
	}
	res
		.status(200)
		.json({ title: 'success', message: 'Materijal uspješno objavljen.' });
};
