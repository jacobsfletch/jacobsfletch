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
