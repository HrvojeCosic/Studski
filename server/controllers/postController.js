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

	//CHECK FOR EXISTING POST
	let postExists = false;
	await Post.findOne({
		where: {
			faculty: facultyName,
			title: postTitle,
			author: postAuthor,
			fileName: fileName,
		},
	})
		.then(result => {
			result.dataValues ? (postExists = true) : (postExists = false);
		})
		.catch(() => {
			console.log('post does not exist, continue...');
		});
	if (postExists) {
		return res
			.status(405)
			.json({ title: 'error', error: 'Taj materijal već postoji.' });
	}

	try {
		let authorID;
		await User.findOne({ where: { username: postAuthor } }).then(result => {
			authorID = result.dataValues.id;
		});

		try {
			let newPost;
			await Post.create({
				user_id: authorID,
				author: postAuthor,
				faculty: facultyName,
				title: postTitle,
				points: 0,
				fileName,
			}).then(post => {
				const { author, faculty, title, points, createdAt, id } =
					post.dataValues;
				newPost = { author, faculty, title, points, createdAt, id };
			});

			res.status(200).json({
				title: 'success',
				message: 'Materijal uspješno objavljen.',
				newPost,
			});
			return;
		} catch {
			respondError(res);
		}
	} catch {
		respondError(res);
	}
};

module.exports.getFacultyPosts = (req, res) => {
	const facultyName = req.params.facultyName;
	Post.findAll({ where: { faculty: facultyName } })
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(() => {
			res
				.status(404)
				.json({ title: 'error', error: 'Neuspješno dohvaćanje materijala.' });
		});
};
