const Sequelize = require('sequelize');
const db = require('../db');

const File = db.define('file', {
	fileName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = File;
