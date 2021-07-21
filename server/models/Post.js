const Sequelize = require('sequelize');
const db = require('../db');

const Post = db.define('user', {
	author: {
		type: Sequelize.STRING,
		allownull: false,
	},
	faculty: {
		type: Sequelize.STRING,
		allownull: false,
	},
	title: {
		type: Sequelize.STRING,
		allownull: false,
	},
	points: {
		type: Sequelize.INTEGER,
		allownull: false,
		default: 0,
	},
	//todo(?): dodati smjer, predmet
});

module.exports = Post;
