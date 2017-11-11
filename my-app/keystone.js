require('dotenv').config();
var keystone = require('keystone');

keystone.init({
    'name': 'jacobsfletch.com',
    'brand': 'jacobsfletch',
    'static': 'public',
    'favicon': 'public/favicon.ico',
    'views': 'templates',
    'view engine': 'pug',
    'auto update': true,
    'auth': true,
    'user model': 'User',
    'port': process.env.PORT,
    'mongo': 'mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_URL,
    'cloudinary config': process.env.CLOUDINARY,
    'mailgun api key': process.env.MAILGUN_API_KEY,
    'mailgun domain': process.env.MAILGUN_DOMAIN
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

keystone.set('nav', {
    'users': 'users',
    'relationships': ['categories', 'tags', 'hashtags'],
    'content': ['globals', 'resumes'],
    'posts': ['projects','products', 'posts']
});

keystone.start(); // Start Keystone to connect to your database and initialise the web server
