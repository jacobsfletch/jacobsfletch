//
// This file contains the common middleware used by your routes.
//
// Extend or replace these functions as your application requires.
//
// This structure is not enforced, and just a starting point. If
// you have more middleware you may want to group it as separate
// modules in your project's /lib directory.
//

var _ = require('underscore');
var UAParser = require('ua-parser-js');
var keystone = require('keystone');

// Initializes the standard view locals
// The included layout depends on the navLinks array to generate
// the navigation in the header, you may wish to change this array
// or replace it with your own templates / logic.
exports.initLocals = function(req, res, next) {
	var locals = res.locals;
	locals.navLinks = [
		{ label: 'start',	    key: 'start',	    href: '/' },
		{ label: 'portfolio',	key: 'portfolio',	href: '/portfolio' },
        { label: 'about',       key: 'about',		href: '/about' },
		{ label: 'contact',		key: 'contact',		href: '/contact' },
		{ label: 'instagram',	key: 'instagram',	href: 'http://www.instagram.com/jacobsfletch', target:'_blank' },
        { label: 'github',		key: 'github',		href: 'http://www.github.com/jacobsfletch', target:'_blank'} ,
	];

	locals.user = req.user;
	next();

};

// Fetch global content
exports.globals = function(req, res, next) {
    var locals = res.locals;
    var Global = keystone.list('Global').model;

    Global.findOne({
        slug: 'main'
    })
    .exec(function (err, doc) {
        locals.global = doc;
        next();
    });
}

// Load the Projects
exports.myself = function(req, res, next) {
    var q = keystone.list('User').model.findOne({
        key: 'jacob-fletcher'
    }).select('status name');
    q.exec(function (err, result) {
        if (result) {
            locals.user = result;
        }
        next();
    });
}

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

exports.breadcrumbs = function(req, res, next) {
    res.locals.response = res;
	next();
}

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

exports.getGeo = function(req, res, next) {
	var address = JSON.stringify(req.user.address);

	doGoogleGeocodeRequest(address, region || keystone.get('default region'), function(err, geocode){
		console.log(geocode);
	});

	next();
};
