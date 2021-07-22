const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports.createNewUser = async (req, res) => {
	const { username, password, repeatPassword, email } = req.body;
	if (password != repeatPassword) {
		res
			.status(403)
			.json({ title: 'error', error: 'Zaporke se ne podudaraju.' });
		return;
	}
	if (password.length < 5) {
		res
			.status(403)
			.json({ title: 'error', error: 'Zaporka mora imati najmanje 5 slova.' });
		return;
	}
	//CHECK FOR EXISTING MAIL
	const emailUniqueCheck = User.findAll({ where: { email: email } });
	let emailAlreadyExists;
	await emailUniqueCheck.then(result => {
		result.length != 0
			? (emailAlreadyExists = true)
			: (emailAlreadyExists = false);
	});
	//CHECK FOR EXISTING USERNAME
	const usernameUniqueCheck = User.findAll({ where: { username: username } });
	let usernameAlreadyExists;
	await usernameUniqueCheck.then(result => {
		result.length != 0
			? (usernameAlreadyExists = true)
			: (usernameAlreadyExists = false);
	});

	if (emailAlreadyExists) {
		res.status(403).json({ title: 'error', error: 'Taj je e-mail zauzet.' });
		return;
	}
	if (usernameAlreadyExists) {
		res
			.status(403)
			.json({ title: 'error', error: 'To je korisničko ime zauzeto.' });
		return;
	}
	//IF EVERYTHING PASSES, CREATE USER
	User.create({
		username: username,
		password: bcrypt.hashSync(password, 10),
		email: email,
	})
		.then(newUser => {
			res.status(200).json({ newUser: newUser });
		})
		.catch(() => {
			res.status(400).json({
				title: 'error',
				error: 'Validacija neuspješna. Ispravite sva polja i pokušajte ponovo.',
			});
			return;
		});
};

module.exports.getAllUsers = (req, res) => {
	User.findAll()
		.then(users => {
			res.status(200).json({ users: users });
		})
		.catch(err => {
			throw err;
		});
};
