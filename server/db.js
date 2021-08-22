const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(
	process.env.DATABASE_DB,
	process.env.USER_DB,
	process.env.PASSWORD_DB,
	{
		define: {
			charset: 'utf8',
			collate: 'utf8_unicode_ci',
		},
		host: process.env.HOST_DB,
		dialect: 'mysql',
		//createdAt and updatedAt automatic columns are ENABLED!
	}
);
