//
// This file is where you define your application routes and controllers.
//
// Start by including the middleware you want to run for every request;
// you can attach middleware to the pre('routes') and pre('render') events.
//
// For simplicity, the default setup for route controllers is for each to be
// in its own file, and we import all the files in the /routes/views directory.
//
// Each of these files is a route controller, and is responsible for all the
// processing that needs to happen for the route (e.g. loading data, handling
// form submissions, rendering the view template, etc).
//
// Bind each route pattern your application should respond to in the function
// that is exported from this module, following the examples below.
//
// See the Express application routing documentation for more information:
// http://expressjs.com/api.html#app.VERB
//

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var express = require('express');
var path = require('path');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.globals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function(req, res, next) {
	var view = new keystone.View(req, res);
    if(req.xhr) {
	    return res.apiError('404 Error.');
    }
    view.render('errors/404');
});

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
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	app.disable('x-powered-by');
	app.use(express.static(path.join(__dirname, 'public')));

	// Old Browser Check
	app.all(/^(?!(\/update)).*$/, middleware.ensureLatestBrowser);

    //
    // URLs
    //

	// Users
	app.all('/api/user/create', keystone.middleware.api, routes.api.user.create);
	app.all('/api/user/login', keystone.middleware.api, routes.api.user.login);
    app.all('/api/user/remove', keystone.middleware.api, routes.api.user.remove);
	app.all('/api/user/autofill/:name', keystone.middleware.api, routes.api.user.autofill);
	app.all('/api/user/:id', keystone.middleware.api, routes.api.user.get);
	app.all('/api/user/:id/update', keystone.middleware.api, routes.api.user.update);
    // Email
    app.all('/api/email/send', keystone.middleware.api, routes.api.email.send);
    // Portfolio
    app.all('/api/portfolio/:slug/previous', keystone.middleware.api, routes.api.portfolio.previous);
    app.all('/api/portfolio/:slug/next', keystone.middleware.api, routes.api.portfolio.next);

    //
    // URLs
    // Colons in the slug represent variables that can be passed through to the route
    // They are renamed after the comma when assigned a route


    // Old Browser
    app.get('/update', routes.views.oldbrowser);

    // Landing
    app.get('/', routes.views.portfolio);

    // Documents
    app.get('/contact', routes.views.contact);
    app.get('/contact/confirmation', routes.views.confirmation);
    app.get('/about', routes.views.about);

    // Portfolio
    app.get('/portfolio', routes.views.portfolio);
    app.get('/portfolio/:project', routes.views.project);

    // Blog
    app.get('/blog', routes.views.blog);
    app.get('/blog/:post', routes.views.post);

    // Shop
    app.get('/shop', routes.views.shop);
    app.get('/shop/:product', routes.views.product);
};
