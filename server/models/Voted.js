const Sequelize = require('sequelize');
const db = require('../db');

const Voted = db.define(
	'voted',
	{
		user_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		post_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{ freezeTableName: true }
);

module.exports = Voted;
