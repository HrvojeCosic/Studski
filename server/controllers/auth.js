const Post = require('../models/Post');
const User = require('../models/User');

module.exports.checkAuth = (req, res, next) => {
	let cookies = JSON.parse(JSON.stringify(req.cookies)); //because [Object: null prototype], which gets returned if there's no cookie, can't be checked with hasOwnProperty()
	if (cookies.hasOwnProperty('connect.sid')) {
		User.findOne({ where: { username: req.session.username } }).then(user => {
			if (!user) {
				return res
					.status(401)
					.json({ title: 'error', error: 'Za nastavak je potrebna prijava.' });
			}
			let posts = [];
			Post.findAll({ where: { author: user.username } })
				.then(allPosts => {
					posts = allPosts;
				})
				.then(() => {
					const { username, points } = user;
					res.json({ title: 'success', user: { username, points, posts } });
				});
		});
	} else {
		return res
			.status(401)
			.json({ title: 'error', error: 'Za nastavak je potrebna prijava.' });
	}
};
