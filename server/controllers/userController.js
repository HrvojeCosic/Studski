const User = require('../models/User');
const db = require('../db');

module.exports.createNewUser = (req, res) => {
	const newUser = User.create({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
	})
		.then(newUser => {
			console.log(newUser instanceof User); //todo: handle this
			res.status(200).json({ newUser: newUser });
		})
		.catch(err => {
			throw err;
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
