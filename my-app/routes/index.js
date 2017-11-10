var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var express = require('express');
var path = require('path');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.globals);
keystone.pre('render', middleware.flashMessages);

// Handle 500 errors
keystone.set('500', function(err, req, res, next) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
		locals.title,
		locals.message;
    if (err instanceof Error) {
        locals.message = err.message;
        locals.err = err.stack;
    }
    if(req.xhr) {
	    return res.apiError('500 Error.');
    }
    view.render('errors/500');
});

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	app.disable('x-powered-by');
	app.use(express.static(path.join(__dirname, 'public')));

	// Old Browser Check
	app.all(/^(?!(\/update)).*$/, middleware.ensureLatestBrowser);

    app.get('/', routes.views.index);
};
