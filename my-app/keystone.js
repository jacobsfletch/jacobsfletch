require('dotenv').config();
var keystone = require('keystone');

keystone.init({
    'name': 'jacobsfletch.com',
    'brand': 'jacobsfletch',
    'static': 'public',
    'favicon': 'public/favicon.ico',
    'views': 'views',
    'view engine': 'pug',
    'auto update': true,
    'auth': true,
    'user model': 'User'
});

keystone.import('models');

// keystone.set() is the same as simply putting the variables in the init object above
keystone.set('locals', {
    _: require('lodash'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

keystone.set('nav', { // Configure the navigation bar in Keystone's Admin UI
    users: 'users',
});

keystone.start(); // Start Keystone to connect to your database and initialise the web server
