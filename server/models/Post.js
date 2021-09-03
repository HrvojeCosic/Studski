const moment = require('moment');
const Sequelize = require('sequelize');
const db = require('../db');

const Post = db.define('post', {
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
	createdAt: {
		type: Sequelize.DATE,
		get() {
			return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY');
		},
	},
	updatedAt: {
		type: Sequelize.DATE,
		get() {
			return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY');
		},
	},

	//todo(?): dodati smjer, predmet
});

module.exports = Post;
