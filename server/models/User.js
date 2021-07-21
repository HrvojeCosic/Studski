const Sequelize = require('sequelize');
const db = require('../db');
const Post = require('./Post');

const User = db.define('user', {
	username: {
		type: Sequelize.STRING,
		allownull: false,
	},
	password: {
		type: Sequelize.STRING,
		allownull: false,
	},
	email: {
		type: Sequelize.STRING,
		allownull: false,
	},
	joined_on: {
		type: Sequelize.DATE,
		allownull: false,
	},
});

User.hasMany(Post);
