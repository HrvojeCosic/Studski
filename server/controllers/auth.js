const User = require('../models/User');

module.exports.checkAuth = (req, res, next) => {
	let cookies = JSON.parse(JSON.stringify(req.cookies)); //because [Object: null prototype], which gets returned if there's no cookie, can't be checked with hasOwnProperty()
	if (cookies.hasOwnProperty('connect.sid')) {
		User.findOne({ username: req.session.username }).then(result => {
			if (!result) {
				return res
					.status(401)
					.json({ title: 'error', error: 'Za nastavak je potrebna prijava.' });
			}
			res.json({ title: 'success', message: result.username });
			next();
		});
	} else {
		return res
			.status(401)
			.json({ title: 'error', error: 'Za nastavak je potrebna prijava.' });
	}
};
