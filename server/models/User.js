const moment = require('moment');
const Sequelize = require('sequelize');
const db = require('../db');
const Post = require('./Post');

const User = db.define('user', {
	username: {
		type: Sequelize.STRING,
		allownull: false,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
		allownull: false,
	},
	email: {
		type: Sequelize.STRING,
		allownull: false,
		unique: true,
		validate: {
			isEmail: {
				msg: 'Pogrešan email format',
			},
		},
	},
	createdAt: {
		type: Sequelize.DATE,
		get() {
			return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY');
		},
	},
});

User.hasMany(Post);

module.exports = User;
