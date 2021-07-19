const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
	host: process.env.HOST_DB,
	user: process.env.USER_DB,
	password: process.env.PASSWORD_DB,
});
db.connect(err => {
	if (err) throw err;
	console.log('Connected to MySQL database...');
});

module.exports = db;
