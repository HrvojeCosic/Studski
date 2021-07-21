const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(
	process.env.DATABASE_DB,
	process.env.USER_DB,
	process.env.PASSWORD_DB,
	{
		host: process.env.HOST_DB,
		dialect: 'mysql',
		//createdAt and updatedAt automatic columns are ENABLED!
	}
);
