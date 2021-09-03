const Post = require('../models/Post');
const User = require('../models/User');
const moment = require('moment');
const Voted = require('../models/Voted');
const File = require('../models/File');

const respondError = res => {
	res.status(400).json({
		title: 'error',
		error: 'Validacija neuspješna. Ispravite sva polja i pokušajte ponovo.',
	});
	return;
};

module.exports.createNewPost = async (req, res) => {
	const { facultyName, postTitle, postAuthor } = req.body;

	//CHECK FOR EXISTING POST
	let postExists = false;
	await Post.findOne({
		where: {
			faculty: facultyName,
			title: postTitle,
			author: postAuthor,
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
			}).then(post => {
				let { author, faculty, title, points, createdAt, id } = post.dataValues;
				createdAt = moment(createdAt).format('DD/MM/YYYY');
				newPost = { author, faculty, title, points, createdAt, id };
			});

			req.files.forEach(async file => {
				await File.create({
					fileName: file.filename,
					post_id: newPost.id,
				});
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
			if (posts.length === 0) {
				return res.status(404).json({
					title: 'error',
					error: 'Taj fakultet ne postoji ili još nema niti jednu objavu.',
				});
			}
			res.status(200).json({ title: 'success', posts });
		})
		.catch(() => {
			return res
				.status(404)
				.json({ title: 'error', error: 'Neuspješno dohvaćanje materijala.' });
		});
};

module.exports.getUserPosts = async (req, res) => {
	const username = req.params.username;

	await User.findOne({ where: { username } }).then(result => {
		if (!result) {
			return res
				.status(404)
				.json({ title: 'error', error: 'Taj korisnik ne postoji.' });
		}
	});

	Post.findAll({ where: { author: username } })
		.then(posts => {
			res.status(200).json({ title: 'success', posts });
		})
		.catch(() => {
			return res
				.status(404)
				.json({ title: 'error', error: 'Neuspješno dohvaćanje materijala.' });
		});
};

module.exports.getSinglePost = (req, res) => {
	const postID = req.params.postID;

	File.findAll({ where: { post_id: postID } }).then(files => {
		Post.findOne({ where: { id: postID } })
			.then(post => {
				if (!post) {
					return res.status(404).json({
						title: 'error',
						error: 'Taj objava ne postoji.',
					});
				}
				res.status(200).json({ title: 'success', post, files });
			})
			.catch(() => {
				return res
					.status(404)
					.json({ title: 'error', error: 'Neuspješno dohvaćanje materijala.' });
			});
	});
};

module.exports.voteForPost = async (req, res) => {
	const { postID, postAuthor, voter } = req.body;
	//GET VOTER'S ID
	await User.findOne({ where: { username: voter } }).then(voter => {
		voterID = voter.dataValues.id;
	});

	Voted.findOne({ where: { user_id: voterID, post_id: postID } }).then(
		result => {
			if (result) {
				result.destroy().then(() => {
					alterPostPoints(postID, 'deduct points');
					alterUserPoints(postAuthor, 'deduct points');
					res.status(200).json({ message: 'downvoted' });
				});
			} else {
				Voted.create({
					user_id: voterID,
					post_id: postID,
				}).then(() => {
					alterPostPoints(postID, 'add points');
					alterUserPoints(postAuthor, 'add points');
					res.status(200).json({ message: 'upvoted' });
				});
			}
		}
	);
};
const alterUserPoints = (username, type) => {
	User.findOne({ where: { username } }).then(user => {
		if (type === 'add points') {
			user.points += 1;
			user.save();
		} else if (type === 'deduct points') {
			user.points -= 1;
			user.save();
		}
	});
};
const alterPostPoints = (postID, type) => {
	if (type === 'add points') {
		Post.findOne({ where: { id: postID } }).then(post => {
			post.points += 1;
			post.save();
		});
	} else if (type === 'deduct points') {
		Post.findOne({ where: { id: postID } }).then(post => {
			post.points -= 1;
			post.save();
		});
	}
};

module.exports.checkVoted = async (req, res) => {
	const { username, postID } = req.params;

	User.findOne({ where: { username } })
		.then(user => {
			Voted.findOne({
				where: { user_id: user.dataValues.id, post_id: postID },
			}).then(voted => {
				if (voted) res.status(200).json({ message: 'already voted' });
				else if (!voted) res.status(200).json({ message: 'has not voted' });
			});
		})
		.catch(() => {
			return res.status(404).json({ message: 'user not logged in' });
		});
};
