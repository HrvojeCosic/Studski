const Post = require('../models/Post');
const User = require('../models/User');

const respondError = res => {
	res.status(400).json({
		title: 'error',
		error: 'Validacija neuspješna. Ispravite sva polja i pokušajte ponovo.',
	});
	return;
};

module.exports.createNewPost = async (req, res) => {
	const { facultyName, postTitle, postAuthor, fileName } = req.body;

	try {
		let authorID;
		await User.findOne({ where: { username: postAuthor } }).then(res => {
			authorID = res.dataValues.id;
		});

		try {
			await Post.create({
				user_id: authorID,
				author: postAuthor,
				faculty: facultyName,
				title: postTitle,
				points: 0,
				fileName,
			});
			res
				.status(200)
				.json({ title: 'success', message: 'Materijal uspješno objavljen.' });
			return;
		} catch {
			respondError();
		}
	} catch {
		respondError();
	}
};
