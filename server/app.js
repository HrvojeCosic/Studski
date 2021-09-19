const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const db = require('./db');
const session = require('express-session');
require('dotenv').config();

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();

const corsOrigin =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_CORS_URL
		: process.env.DEV_CORS_URL;
app.use(cors({ origin: corsOrigin, credentials: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//SESSION SETUP
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessConfig = {
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: new SequelizeStore({
		db: db /*sequelize*/,
	}),
	cookie: {
		httpOnly: false,
		maxAge: 1 * 12 * 4 * 7 * 24 * 60 * 60 * 1000, //about a year
	},
};
app.use(session(sessConfig));
if (process.env.NODE_ENV === 'production') {
	app.set('trust proxy', 1);
	sessConfig.cookie.secure = true;
}

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

db.authenticate()
	.then(async () => {
		await db.sync();
		console.log('Connection has been established successfully.');
	})
	.catch(error => console.error('Unable to connect to the database:', error));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	// res.status(err.status || 500);  //no default engine was specified and no extension was provided...
	// res.render('error');
});

module.exports = app;
