// Require keystone
require('dotenv').config();

var keystone = require('keystone');


// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
    'name': 'jacobsfletch',
    'brand': 'jacobsfletch',
    'static': 'public',
    //'favicon': 'public/favicon.ico',
    'views': 'templates/views',
    'view engine': 'pug',
    'auto update': true,
    'mongo': 'mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_URL,
    'session store' : 'mongo',
    'session': true,
    'auth': true,
    'user model': 'User',
    'port' : 3000,
    'cookie secret': process.env.COOKIE_SECRET,
    'google server api key' : process.env.GOOGLE_SERVER_API,
    'google api key' : process.env.GOOGLE_API,
    'wysiwyg additional buttons': 'format',
    'mandrill api key': process.env.MANDRIL,
    'mandrill username': process.env.MANDRIL_USERNAME,
    'emails': 'templates/emails',
});

keystone.set('s3 config', {
    bucket: 'macker',
    key:  process.env.S3_KEY,
    secret:  process.env.S3_SECRET,
});

keystone.set('cloudinary config', process.env.CLOUDINARY);
keystone.set('cloudinary secure', true);

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
    'users': 'users',
    'projects': 'projects',
    'posts': 'posts',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
