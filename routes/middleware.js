var _ = require('underscore');
var UAParser = require('ua-parser-js');
var keystone = require('keystone');

// Fetches and clears the flashMessages before a view is rendered
exports.flashMessages = function(req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;

	next();

};

// Check if user is on a modern browser
exports.ensureLatestBrowser = function(req, res, next) {
	var parser = new UAParser();
	var ua = req.headers['user-agent'];
	var browserName = parser.setUA(ua).getBrowser().name;
	var fullBrowserVersion = parser.setUA(ua).getBrowser().version;
	var browserVersion = typeof fullBrowserVersion == 'array' ? fullBrowserVersion.split(".",1).toString() : '';
	var browserVersionNumber = Number(browserVersion);

	if(browserName == 'IE' && fullBrowserVersion < 10) {
		res.redirect('/update/');
	}
	else{
		next();
	}
}

exports.requireUser = function(req, res, next) {

	if (!req.user) {
		req.flash('error', 'Sign in to access this page.');
		res.redirect('/sign-in');
	} else {
		next();
	}

};

exports.requireAdmin = function(req, res, next) {

	if (!req.user.canAccessKeystone) {
		req.flash('error', 'Sign in to access this page.');
		res.redirect('/sign-in');
	} else {
		next();
	}
};

exports.api = function (req, res, next) {
	var sendResponse = function(status) {
		res.json(status);
	};

	var sendError = function(key, err, msg) {
		msg = msg || 'API Error';
		key = key || 'unknown error';
		msg += ' (' + key + ')';
		console.log(msg + (err ? ':' : ''));
		if (err) {
			console.log(err);
		}
		res.status(500);
		sendResponse({ error: key || 'error', detail: err ? err.message : '' });
	};

	res.apiResponse = function (data) {
		if (req.query.callback) {
			res.jsonp(data);
		} else {
			res.json(data);
		}
	};

	res.apiError = function (key, err, msg, code) {
		msg = msg || 'Error';
		key = key || 'unknown error';
		msg += ' (' + key + ')';
		if (keystone.get('logger')) {
			console.log(msg + (err ? ':' : ''));
			if (err) {
				console.log(err);
			}
		}

		res.slackMsg('Macker API Error\n' + key, {
			attachments: [{
				fallback: JSON.stringify(err, null, 4),
				author_name: req.user ? req.user.name.full : 'Guest',
				author_link: req.user ? req.protocol + '://' + req.get('host') + '/keystone/users/' + req.user._id : false,
				title: req.get('host') + req.originalUrl,
				title_link: req.protocol + '://' + req.get('host') + req.originalUrl,
				text: '*User-Agent: ' + req.headers['user-agent'] + '*\n' +JSON.stringify(err, null, 4),
				color: '#CD2626',
				footer: 'IP: ' + req.headers['x-forwarded-for'] || req.connection.remoteAddress,
				ts: +new Date()
			}]
		});

		sendError(key, err, msg);
	};


	res.apiNotFound = function (err, msg) {
		res.apiError('data not found', err, msg || 'not found', 404);
	};

	res.apiNotAllowed = function (err, msg) {
		res.apiError('access not allowed', err, msg || 'not allowed', 403);
	};

	next();
};
